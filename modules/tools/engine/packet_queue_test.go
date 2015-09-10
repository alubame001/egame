package engine

import (
	"fmt"
	. "github.com/onsi/ginkgo"
	"math/rand"
	"sync"
	"time"
)

func _tQueueStop() {
	var (
		q FifoQ
		w sync.WaitGroup
	)

	q.Init()
	w.Add(1)

	stop := func() {
		time.Sleep(100 * time.Millisecond)
		q.Stop()
		fmt.Println("stop queue")
	}

	pop := func() {
		q.Pop(10, true)
		q.Pop(10, true)
		w.Done()
	}

	go pop()
	go stop()

	w.Wait()
}

func _tQueuePushAndPop() {
	var (
		q FifoQ
		w sync.WaitGroup
		c int
	)
	q.Init()
	w.Add(2)

	push := func() {
		time.Sleep(100 * time.Millisecond)
		for i := 0; i < 100; i++ {
			q.Push(&packet{_C_PACKET_PING, []byte(""), true})
			fmt.Println("write one packet")
			time.Sleep(10 * time.Millisecond)
		}
		w.Add(-1)
	}

	pop := func() {
		for c < 100 {
			result := q.Pop(10, true)
			c = c + len(result)
			fmt.Printf("pop %d packets, total %d\n", len(result), c)
			if c > 10 {
				time.Sleep(20 * time.Duration(rand.Intn(10)) * time.Millisecond)
			}
		}
		w.Add(-1)
	}

	go push()
	go pop()

	w.Wait()
}

var _ = Describe("queue", func() {
	It("push & pop ", _tQueuePushAndPop)
	It("stop", _tQueueStop)
})
