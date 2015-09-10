package engine

import (
	"bytes"
	"encoding/base64"
	"errors"
	"fmt"
	"strconv"
)

const (
	Protocol = 3

	_C_PACKET_OPEN    byte = 0
	_C_PACKET_CLOSE   byte = 1
	_C_PACKET_PING    byte = 2
	_C_PACKET_PONG    byte = 3
	_C_PACKET_MESSAGE byte = 4
	_C_PACKET_UPGRADE byte = 5
	_C_PACKET_NOOP    byte = 6
	_C_PACKET_ERROR   byte = 7

	_CHAR_ZERO byte = 48
)

type packet struct {
	op   byte        `json:"type,omitempty"`
	data interface{} `json:"data,omitempty"`
	//是否为二进制数据,如果为true，按binary方式处理，如果为false，则按字符串处理
	binary bool
}

func (p *packet) encodePacket(supportsBinary bool, utf8encode bool) ([]byte, error) {
	var (
		buf    bytes.Buffer
		binary []byte
	)

	switch data := p.data.(type) {
	case bytes.Buffer:
		binary = data.Bytes()
		break
	// case string:
	// 	// _log.Printf("encoding string")
	// 	// return p.encodeString()
	case []byte:
		binary = data
		break
	default:
		return nil, errors.New("not support type")
	}

	if p.binary {
		if supportsBinary {
			buf.WriteByte(p.op)
			buf.Write(binary)
		} else { //do base64 encoding
			buf.WriteByte('b')
			buf.WriteByte(_CHAR_ZERO + p.op)
			buf.WriteString(base64.StdEncoding.EncodeToString(binary))
		}
	} else {
		buf.WriteByte(_CHAR_ZERO + p.op)
		buf.Write(binary)
	}
	return buf.Bytes(), nil
}

func (p *packet) decodePacket(data []byte, binaryType bool, utf8decode bool) (*packet, error) {
	var (
		err error
	)
	if data[0] == 'b' { // base64 encoding string
		p.op = data[1] - _CHAR_ZERO
		p.binary = true
		p.data, err = base64.StdEncoding.DecodeString(string(data[2:]))
		if err != nil {
			return nil, err
		}
	} else if data[0] < _CHAR_ZERO { // binary data
		p.op = data[0]
		p.data = data[1:]
		p.binary = true
	} else { // string
		p.op = data[0] - _CHAR_ZERO
		p.data = data[1:]
		p.binary = false
	}
	return p, err
}

func encodePayloadAsBinary(packets []*packet) ([]byte, error) {
	var (
		buf   bytes.Buffer
		bytes []byte
		err   error
	)

	for _, pkg := range packets {
		//pkg := e.Value.(*packet)

		if bytes, err = pkg.encodePacket(true, true); err != nil {
			return nil, err
		}
		if !pkg.binary {
			buf.WriteByte(0) // string
		} else {
			buf.WriteByte(1) // binary
		}
		length := strconv.Itoa(len(bytes))
		for i := 0; i < len(length); i++ {
			buf.WriteByte(length[i] - _CHAR_ZERO)
		}
		buf.WriteByte(0xff)
		buf.Write(bytes)
	}

	return buf.Bytes(), nil
}

func encodePayload(packets []*packet, supportsBinary bool) ([]byte, error) {

	if supportsBinary {
		return encodePayloadAsBinary(packets)
	}

	var (
		buf   bytes.Buffer
		bytes []byte
		err   error
	)

	if len(packets) == 0 {
		if _, err = buf.WriteString("0:"); err != nil {
			return nil, err
		}

		return buf.Bytes(), nil
	}

	for _, pkg := range packets {

		if bytes, err = pkg.encodePacket(supportsBinary, true); err != nil {
			return nil, err
		}
		buf.WriteString(strconv.Itoa(len(bytes)))
		buf.WriteString(":")
		buf.Write(bytes)
	}

	return buf.Bytes(), nil
}

func decodePayload(data []byte, cb func(*packet) (bool, error)) error {
	const (
		_PACKET_TEXT           = iota
		_PACKET_BINARY         = iota
		_PACKET_TEXT_IN_BINARY = iota
	)

	var (
		i    int = 0
		err  error
		stop bool = false
	)

	for i < len(data) {
		var (
			pkglen int = 0
			p      packet
		)

		if data[i] == 0 || data[i] == 1 { // binary or text_in_binary encoding
			for ; i < len(data) && data[i] != 0xff; i++ {
				pkglen = pkglen*10 + int(data[i])
			}
			if i >= len(data) {
				return errors.New("unexpect packet length")
			}
			if pkglen+i+1 > len(data) {
				return errors.New("unexpect packet length")
			}
			p.binary = data[i] == 1

		} else { // text encoding
			var start = i
			for ; i < len(data) && data[i] != ':'; i++ {
			}
			if i >= len(data) {
				return errors.New("unexpect packet length")
			}
			fmt.Printf("-- -- %s %d %d", data[start:i], start, i)
			if pkglen, err = strconv.Atoi(string(data[start:i])); err != nil {
				return err
			}
			if i+1+pkglen > len(data) {
				return errors.New("unexpect packet length")
			}
			p.binary = false
		}

		if _, err = p.decodePacket(data[i+1:i+1+pkglen], true, true); err != nil {
			return err
		}

		i += 1 + pkglen

		stop, err = cb(&p)
		if err != nil {
			return err
		}
		if stop {
			break
		}
	}
	return nil
}
