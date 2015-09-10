package engine

import (
	"github.com/gorilla/websocket"
	"net/http"
	"sync/atomic"
)

type WebSocketTransport struct {
	outQ        PacketQ
	onPacket    PacketHandler
	_connection *websocket.Conn
	_stop       int32
}

func (t *WebSocketTransport) Init(outQ PacketQ, packetHandler PacketHandler) {
	t.outQ = outQ
	t.onPacket = packetHandler

	atomic.StoreInt32(&t._stop, 0)
}

func (t *WebSocketTransport) GetName() string {
	return _C_TRANSPORT_NAME_WEBSOCKET
}

func (t *WebSocketTransport) GetUpgradesTo() []string {
	return []string{}
}

func (t *WebSocketTransport) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var upgrader websocket.Upgrader

	if conn, err := upgrader.Upgrade(w, r, nil); err != nil {
		_log.Printf("client upgrade error: %s\n", err.Error())
	} else {
		t._connection = conn
	}

	go t.writeLoop()

	t.readLoop()
}

func (t *WebSocketTransport) Close() error {
	if t._connection != nil {
		r := websocket.FormatCloseMessage(websocket.CloseAbnormalClosure, "server closed")
		t._connection.WriteMessage(websocket.TextMessage, r)
		t._connection.Close()
		t._connection = nil
	}

	atomic.StoreInt32(&t._stop, 1)

	return nil
}

func (t *WebSocketTransport) readLoop() {

	for atomic.LoadInt32(&t._stop) == 1 {
		_, bytes, err := t._connection.ReadMessage()
		if err != nil {
			break
		}

		var p = packet{}

		if _, err := p.decodePacket(bytes, true, true); err != nil {
			//ret := websocket.FormatCloseMessage(websocket.CloseNormalClosure, "decode error")
			t._connection.Close()
			break
		}

		t.onPacket(&p)
	}

	_log.Printf("websocket read loop end")
}

func (t *WebSocketTransport) writeLoop() {

	for atomic.LoadInt32(&t._stop) == 1 {
		packets := t.outQ.Pop(100, true)
		for _, p := range packets {
			_log.Printf("write one packet %v", p)
			t.Write(p)
		}
	}
}

func (t *WebSocketTransport) Write(p *packet) error {
	if bytes, err := p.encodePacket(true, true); err != nil {
		_log.Fatalf("encode packet error: %s", err.Error())
		t._connection.Close()
	} else {
		_log.Printf("write packet %v", p)
		t._connection.WriteMessage(websocket.TextMessage, bytes)
	}
	return nil
}
