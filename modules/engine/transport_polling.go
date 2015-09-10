package engine

import (
	"sync/atomic"
	// "container/list"
	"io/ioutil"
	"net/http"
	//"time"
)

type Polling struct {
	Id       string
	onPacket func(*packet) (bool, error)

	readyState int

	writable    int32
	shouldClose bool
	request     *http.Request
	response    http.ResponseWriter
	outQ        PacketQ
}

func (p *Polling) Init(outQ PacketQ, packetHandler PacketHandler) {
	_log.Printf("initialize transport")

	p.outQ = outQ
	//p.outQ = &FifoQ{}
	p.onPacket = packetHandler

	//p.outQ.Init()
}

func (p *Polling) GetName() string {
	return _C_TRANSPORT_NAME_POLL
}

func (p *Polling) GetUpgradesTo() []string {
	return []string{_C_TRANSPORT_NAME_WEBSOCKET}
}

func (p *Polling) ServeHTTP(response http.ResponseWriter, request *http.Request) {

	if "GET" == request.Method {
		p.onPoll(request, response)
	} else if "POST" == request.Method {
		p.onData(request, response)
	} else {
		response.WriteHeader(http.StatusBadRequest)
		response.Write([]byte("bad request"))
	}
}

func (p *Polling) Close() error {
	if atomic.CompareAndSwapInt32(&p.writable, 1, 0) {
		http.Error(p.response, "transport closed", http.StatusOK)
	}
	return nil
}

func (p *Polling) onPoll(request *http.Request, response http.ResponseWriter) {

	if !atomic.CompareAndSwapInt32(&p.writable, 0, 1) {
		http.Error(p.response, "request overlap", http.StatusBadRequest)
		return
	}

	p.request = request
	p.response = response

	//_log.Printf("packet polling")

	packets := p.outQ.Pop(100, true)

	if !atomic.CompareAndSwapInt32(&p.writable, 1, 0) {
		_log.Printf("client transport write ok")
		return
	}

	if packets == nil || len(packets) == 0 {
		http.Error(response, "fetch empty", http.StatusBadRequest)
		return
	}

	if bytes, err := encodePayload(packets, true); err != nil {
		http.Error(p.response, "encode packet error:"+err.Error(), http.StatusInternalServerError)
	} else {
		response.WriteHeader(http.StatusOK)
		response.Write(bytes)
	}

	// select {
	// case <-time.After(time.Second * 25):
	// 	if atomic.CompareAndSwapInt32(&p.writable, 1, 0) {
	// 		_log.Printf("polling timeout")
	// 		http.Error(p.response, "ping timeout", http.StatusBadRequest)
	// 	}
	// case bytes := <-p.contentBytes:
	// 	if atomic.CompareAndSwapInt32(&p.writable, 1, 0) {
	// 		_log.Printf("polling ok")
	// 		p.response.WriteHeader(http.StatusOK)
	// 		p.response.Write(bytes)
	// 	}
	// }
}

func (p *Polling) onData(req *http.Request, res http.ResponseWriter) {
	var (
		body []byte
		err  error
	)

	if body, err = ioutil.ReadAll(req.Body); err != nil {
		res.WriteHeader(http.StatusBadRequest)
		return
	}

	//_log.Printf("onData %s\n", body, req)

	if err = decodePayload(body, p.onPacket); err != nil {
		res.WriteHeader(http.StatusBadRequest)
		return
	}

	res.Write([]byte("ok"))
}

func (p *Polling) Write(packet *packet) error {
	p.outQ.Push(packet)
	return nil
}
