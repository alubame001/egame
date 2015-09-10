package engine

import (
	"encoding/hex"
	"encoding/json"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"testing"
)

func TestAA(t *testing.T) {
	var (
		bytes []byte
		err   error
	)

	bytes, err = json.Marshal(map[string]interface{}{"a1": 1, "a2": 2})
	if err != nil {
		t.Error(err)
	}

	p := packet{op: _C_PACKET_OPEN, data: bytes, binary: false}
	p1 := packet{op: _C_PACKET_OPEN, data: bytes, binary: false}

	if bytes, err = p.encodePacket(true, false); err != nil {
		t.Error(err)
	} else {
		t.Log(hex.EncodeToString(bytes))
	}

	var packets = []*packet{&p, &p1}
	if bytes, err = encodePayload(packets, true); err != nil {
		t.Error(err)
	} else {
		t.Log(hex.EncodeToString(bytes))
	}
}

func _tDecodeString() {
	var (
		b0 []byte
		e0 error
		p  packet
	)

	b0, e0 = hex.DecodeString("347b226131223a312c226132223a327d")
	Expect(e0).ShouldNot(HaveOccurred())

	_, e0 = p.decodePacket(b0, false, false)
	Expect(e0).ShouldNot(HaveOccurred())

	Expect(p.op).Should(Equal(_C_PACKET_MESSAGE))
	Expect(string(p.data.([]byte))).To(Equal("{\"a1\":1,\"a2\":2}"))

	GinkgoWriter.Write(p.data.([]byte))
}

func _tDecodeBase64() {
	var (
		b0 []byte
		e0 error
		p  packet
	)

	b0, e0 = hex.DecodeString("623465794a684d5349364d537769595449694f6a4a39")
	Expect(e0).ShouldNot(HaveOccurred())

	_, e0 = p.decodePacket(b0, false, false)
	Expect(e0).ShouldNot(HaveOccurred())

	Expect(p.op).Should(Equal(_C_PACKET_MESSAGE))
	Expect(string(p.data.([]byte))).To(Equal("{\"a1\":1,\"a2\":2}"))

	GinkgoWriter.Write(p.data.([]byte))
}

func _tDecodeBinary() {
	var (
		b0 []byte
		e0 error
		p  packet
	)

	b0, e0 = hex.DecodeString("047b226131223a312c226132223a327d")
	Expect(e0).ShouldNot(HaveOccurred())

	_, e0 = p.decodePacket(b0, true, true)
	Expect(e0).ShouldNot(HaveOccurred())

	Expect(p.op).Should(Equal(_C_PACKET_MESSAGE))
	Expect(string(p.data.([]byte))).To(Equal("{\"a1\":1,\"a2\":2}"))

	GinkgoWriter.Write(p.data.([]byte))
}

func _tDecodePayloadString() {
	var (
		b0 []byte
		e0 error
		//p  packet
	)
	b0, e0 = hex.DecodeString("31363a347b226131223a312c226132223a327d31363a347b226131223a312c226132223a327d")
	Expect(e0).ShouldNot(HaveOccurred())
	Expect(b0).ShouldNot(BeNil())

	e0 = decodePayload(b0, func(p *packet) (bool, error) {
		Expect(p.op).Should(Equal(_C_PACKET_MESSAGE))
		Expect(string(p.data.([]byte))).To(Equal("{\"a1\":1,\"a2\":2}"))

		GinkgoWriter.Write(p.data.([]byte))

		return false, nil
	})

	Expect(e0).ShouldNot(HaveOccurred())
}

func _tDecodePayloadBinary() {
	var (
		b0 []byte
		e0 error
		//p  packet
	)
	b0, e0 = hex.DecodeString("000106ff347b226131223a312c226132223a327d000106ff347b226131223a312c226132223a327d")
	Expect(e0).ShouldNot(HaveOccurred())
	Expect(b0).ShouldNot(BeNil())

	e0 = decodePayload(b0, func(p *packet) (bool, error) {
		Expect(p.op).Should(Equal(_C_PACKET_MESSAGE))
		Expect(string(p.data.([]byte))).To(Equal("{\"a1\":1,\"a2\":2}"))

		GinkgoWriter.Write(p.data.([]byte))

		return false, nil
	})

	Expect(e0).ShouldNot(HaveOccurred())
}

var _ = Describe("packet", func() {
	Describe("decode", func() {
		It("from string", _tDecodeString)
		It("from base64", _tDecodeBase64)
		It("from binary", _tDecodeBinary)
	})

	Describe("decode payload", func() {
		It("from string", _tDecodePayloadString)
		It("from binary", _tDecodePayloadBinary)
	})
})
