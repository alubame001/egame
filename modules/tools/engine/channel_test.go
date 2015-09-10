package engine_test

import (
	. "github.com/onsi/ginkgo"
	"sync"
	"time"
)

func _t_channel_write_to_close() {
	var testC = make(chan bool, 5)
	var w sync.WaitGroup
	w.Add(2)

	go func() {
		for i := 0; i < 10; i++ {
			select {
			case testC <- true:
				GinkgoWriter.Write([]byte("+"))
			default:
				GinkgoWriter.Write([]byte("X"))
			}
		}
		close(testC)
		w.Add(-1)
	}()

	go func() {
		for {
			//GinkgoWriter.Write([]byte("recving\n"))
			if _, ok := <-testC; !ok {
				//GinkgoWriter.Write([]byte("recv done\n"))
				break
			} else {
				GinkgoWriter.Write([]byte("."))
				time.Sleep(time.Millisecond * 10)
			}
		}
		w.Add(-1)
	}()

	w.Wait()
	//GinkgoWriter.Write([]byte("done"))
}

var _ = Describe("channel", func() {
	It("write to close", _t_channel_write_to_close)
})
