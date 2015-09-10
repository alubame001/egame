package engine

import (
	_ "fmt"
	. "github.com/onsi/ginkgo"
	_ "time"
)

func _bQueueAppend(b Benchmarker) {
	const LIMIT = 1000000

	var p packet = packet{_C_PACKET_OPEN, []byte("sfsdfsdfasdfjaksdfjasldfkasdfs"), true}

	b.Time("by value", func() {
		var p0 []packet = make([]packet, 0, LIMIT)

		for i := 0; i < LIMIT; i++ {
			p0 = append(p0, p)
		}
	})

	b.Time("by pointer", func() {
		var p0 []*packet = make([]*packet, 0, LIMIT)

		for i := 0; i < LIMIT; i++ {
			p0 = append(p0, &p)
		}
	})
}

var _ = Describe("slice", func() {
	Measure("append", _bQueueAppend, 10)
})
