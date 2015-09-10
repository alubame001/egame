package engine

import (
	"log"
	"net/http"
	"os"
)

var (
	// _MESSAGES = map[int]string{
	// 	_UNKNOWN_TRANSPORT:    "Transport unknown",
	// 	_UNKNOWN_SID:          "Session ID unknown",
	// 	_BAD_HANDSHAKE_METHOD: "Bad handshake method",
	// 	_BAD_REQUEST:          "Bad request",
	// }

	_log = log.New(os.Stdout, "engine.io ", log.LstdFlags|log.Lshortfile)
)

type ConnectionHandler func(c *Client)

type EngineIO struct {
	_connectionHandler ConnectionHandler
	_clients           map[string]*Client
	_config            Config
}

func (this *EngineIO) Init(config Config, handler ConnectionHandler) {
	this._config = config
	this._connectionHandler = handler
	this._clients = map[string]*Client{}
}

func (this *EngineIO) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	//defer r.Body.Close()

	//_log.Printf("%s %s %s", req.RemoteAddr, req.Method, req.RequestURI)

	var (
		client *Client
		err    error
		ok     bool
		sid    string
		qargs  = req.URL.Query()
	)

	if sid = qargs.Get("sid"); sid == "" {
		client, err = this.handshake(w, req)

	} else if client, ok = this._clients[sid]; !ok {
		client, err = this.handshake(w, req)
	}

	if err != nil {
		errorResult(w, err)
	} else if _, ok := req.Header["Upgrade"]; !ok {
		client.Transport.ServeHTTP(w, req)
		// } else if ws == "websocket" {
		// 	newtran := CreateTransport(ws)
		// 	client.maybeUpgrade(newtran)
	} else if transport, err := CreateTransport("websocket"); err != nil {
		http.Error(w, "unknown upgrade", http.StatusBadRequest)
	} else {
		client.maybeUpgrade(transport)
		transport.ServeHTTP(w, req)
	}
}

func (this *EngineIO) Close() {
	var clients = this._clients

	for x, y := range clients {
		_log.Printf("close client %s", x)
		y.Close()
	}

	this._clients = map[string]*Client{}
}

func (e *EngineIO) onClientEvent(c *Client, event int) {
	switch event {
	case _C_CLIENT_OPENED:
		if exist, ok := e._clients[c.Id]; ok {
			exist.Close()
		}
		e._clients[c.Id] = c
		if e._connectionHandler != nil {
			e._connectionHandler(c)
		}
		break
	case _C_CLIENT_CLOSED:
		delete(e._clients, c.Id)
		break
	}
}

func (e *EngineIO) handshake(w http.ResponseWriter, req *http.Request) (*Client, error) {
	_log.Printf("handshake ", req.RemoteAddr)

	var (
		transport Transport
		err       error
	)

	if transport, err = CreateTransport(req.URL.Query().Get("transport")); err != nil {
		return nil, err
	}

	var client Client

	client.Init(e._config, transport, req, e.onClientEvent)

	return &client, nil
}
