package engine

import (
	"encoding/json"
	"errors"
	//"github.com/golang/glog"
	"net/http"
	"sync/atomic"
	"time"
)

type firstReply struct {
	Sid          string   `json:"sid,omitempty"`
	Upgrades     []string `json:"upgrades,omitempty"`
	PingInterval int      `json:"pingInterval,omitempty"`
	PingTimeout  int      `json:"pingTimeout,omitempty"`
}

const (
	_C_CLIENT_OPENING int = iota
	_C_CLIENT_OPENED  int = iota
	_C_CLIENT_CLOSING int = iota
	_C_CLIENT_CLOSED  int = iota
)

type ClientEventHandler func(c *Client, event int)
type ClientMessageHandler func(c *Client, message []byte)

type Client struct {
	Metadata

	Id    string
	At    time.Time
	state int
	//InputQ chan []byte

	MessageCallback ClientMessageHandler
	_eventcb        ClientEventHandler
	outQ            PacketQ
	EngineIO        *EngineIO
	Transport       Transport
	Request         *http.Request
}

func (c *Client) Init(config Config, transport Transport,
	request *http.Request, eventcb ClientEventHandler) error {

	//c.InputQ = make(chan []byte, 3)
	c.Id, _ = generateId(request)
	c.outQ = &FifoQ{}

	if eventcb == nil {
		c._eventcb = func(c *Client, op int) {}
	} else {
		c._eventcb = eventcb
	}

	c.MessageCallback = func(c *Client, bytes []byte) {}
	c.Transport = transport

	c.outQ.Init()
	c.Metadata.Init(c.Id, config)
	c.Transport.Init(c.outQ, c.onPacket)

	c._log.Printf("initialize client, transport %s, request %v",
		c.Transport.GetName(), request)

	var (
		bytes    []byte
		jsonInfo map[string]interface{}
		err      error
	)

	jsonInfo = map[string]interface{}{
		"sid":          c.Id,
		"upgrades":     c.getAvailableUpgrades(),
		"pingInterval": c._config.PingInterval,
		"pingTimeout":  c._config.PingTimeout}

	if bytes, err = json.Marshal(jsonInfo); err != nil {
		return err
	}

	if err = c.sendpacket(_C_PACKET_OPEN, bytes, false); err != nil {
		return err
	}

	c.setPingTimeout()
	c.state = _C_CLIENT_OPENED
	c._eventcb(c, _C_CLIENT_OPENED)

	return nil
}

func (c *Client) onPacket(p *packet) (bool, error) {
	if c.state != _C_CLIENT_OPENED {
		return true, errors.New("receive packet out of opened state")
	}

	//glog.Infof("%s receive packet", p)

	c.setPingTimeout()

	switch p.op {
	case _C_PACKET_PING:
		return false, c.sendpacket(_C_PACKET_PONG, []byte{}, true)
	case _C_PACKET_ERROR:
		return true, c.onClose("parse error")
	case _C_PACKET_MESSAGE:
		c.MessageCallback(c, p.data.([]byte))
		break
	}
	return false, nil
}

func (c *Client) maybeUpgrade(transport Transport) error {
	_log.Printf(`might upgrade socket transport from "%s" to "%s"`,
		c.Transport.GetName(), transport.GetName())

	var (
		upgrading int32 = 0
	)

	go func() { //timeout callback
		time.Sleep(time.Millisecond * 30000)
		if atomic.CompareAndSwapInt32(&upgrading, 0, -1) {
			transport.Close()
		}
	}()

	onPacket := func(p *packet) (bool, error) {
		if p.op == _C_PACKET_PING { //&& "probe" == string(p.data.([]byte))
			transport.Write(&packet{
				_C_PACKET_PONG,
				[]byte("probe"),
				false,
			})
			//c.sendpacket(_C_PACKET_PONG, []byte("pong"), false)
		} else if p.op == _C_PACKET_UPGRADE &&
			c.state != _C_CLIENT_CLOSED {

			c.setPingTimeout()
			c.Transport = transport

		} else {
			transport.Close()
		}
		return false, nil
	}

	transport.Init(c.outQ, onPacket)

	return nil
}

func (c *Client) onClose(reason string) error {

	if c.state == _C_CLIENT_CLOSED {
		return errors.New("client closed already")
	}

	//clearTimeout  pingTimeoutTimer
	//clearInterval checkIntervalTimer
	//cleanTimeout  upgradeTimeoutTimer
	//clearTransport
	c.state = _C_CLIENT_CLOSED
	c._eventcb(c, _C_CLIENT_CLOSED)

	return nil
}

func (c *Client) onError() error {
	return nil
}

func (c *Client) setTransport(transport Transport) error {
	return nil
}

func (c *Client) Close() error {
	if c.state != _C_CLIENT_OPENED {
		return nil
	}
	c.state = _C_CLIENT_CLOSING
	c.Transport.Close()
	c.onClose("force close")
	return nil
}

func (c *Client) Write(p []byte) (int, error) {
	c.outQ.Push(&packet{op: _C_PACKET_MESSAGE, data: p, binary: true})
	return len(p), nil
}

func (c *Client) WriteString(text string) {
	c.outQ.Push(&packet{op: _C_PACKET_MESSAGE, data: []byte(text), binary: false})
}

func (c *Client) sendpacket(op byte, data interface{}, binary bool) error {
	c.outQ.Push(&packet{op: op, data: data, binary: binary})
	return nil
}

func (c *Client) setPingTimeout() {
	var ticks = c._config.PingInterval + c._config.PingTimeout
	var now = time.Now().Add(time.Millisecond * ticks)
	c.At = now
}

func (c *Client) getAvailableUpgrades() []string {
	if !c._config.AllowUpgrades {
		return []string{}
	}
	var (
		availableUpgrades []string = []string{}
		allUpgrades       []string = c.Transport.GetUpgradesTo()
		enableTransports  []string = c._config.Transports
	)

	// c._log.Printf("enable transports %v", enableTransports)
	// c._log.Printf("allUpgrades %v", allUpgrades)

	if enableTransports == nil ||
		allUpgrades == nil ||
		len(enableTransports) == 0 ||
		len(allUpgrades) == 0 {
		return []string{}
	}

	for _, x := range enableTransports {
		for _, y := range allUpgrades {
			//c._log.Printf("transport upgrade: %s -> %s", x, y)
			if x == y {
				availableUpgrades = append(availableUpgrades, x)
			}
		}
	}
	return availableUpgrades
}
