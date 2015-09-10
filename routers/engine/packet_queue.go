package engine

import (
	"sync"
	"sync/atomic"
)

var (
	__EMPTY_PACKET_LIST = []*packet{}
)

type PacketQ interface {
	Init()

	Push(p *packet)

	Pop(length int, wait bool) []*packet

	Stop()
}

type FifoQ struct {
	_lock     sync.Mutex
	_cond     *sync.Cond
	_messages []*packet
	_stop     int32
}

func (q *FifoQ) Init() {
	q._stop = 0
	q._cond = sync.NewCond(&q._lock)
}

func (q *FifoQ) Stop() {
	atomic.StoreInt32(&q._stop, 1)
	q._cond.Broadcast()
}

func (q *FifoQ) Pop(length int, wait bool) []*packet {
	q._lock.Lock()
	defer q._lock.Unlock()

restart:
	if q._messages == nil || len(q._messages) == 0 {
		if atomic.LoadInt32(&q._stop) == 0 && wait {
			q._cond.Wait()
			goto restart
		} else {
			return __EMPTY_PACKET_LIST
		}
	}

	var wbuf []*packet

	if len(q._messages) <= length {
		wbuf = q._messages
		q._messages = []*packet{}
	} else {
		wbuf = q._messages[:length]
		q._messages = q._messages[length:]
	}
	return wbuf
}

func (q *FifoQ) Push(p *packet) {
	q._lock.Lock()
	defer q._lock.Unlock()

	q._messages = append(q._messages, p)
	q._cond.Signal()
}
