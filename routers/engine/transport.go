package engine

import (
	//"errors"
	//"fmt"
	"io"
	"net/http"
)

const (
	_C_TRANSPORT_NAME_POLL      = "polling"
	_C_TRANSPORT_NAME_WEBSOCKET = "websocket"

	TRANSPORT_OPENING = iota
	TRANSPORT_CLOSING = iota
	TRANSPORT_CLOSED  = iota
)

type PacketHandler func(p *packet) (bool, error)

type Transport interface {
	io.Closer
	http.Handler

	GetUpgradesTo() []string
	GetName() string

	Init(outQ PacketQ, packetHandler PacketHandler)

	Write(p *packet) error
}

func CreateTransport(name string) (transport Transport, err error) {
	switch name {
	case _C_TRANSPORT_NAME_POLL:
		transport = &Polling{}
		break
	case _C_TRANSPORT_NAME_WEBSOCKET:
		transport = &WebSocketTransport{}
		break
	default:
		transport, err = nil, NewErr(_UNKNOWN_TRANSPORT)
	}
	return
}
