package engine

import (
	. "github.com/onsi/ginkgo"
	//. "github.com/onsi/gomega"
	"time"
)

func _tTimer() {
	timer := time.NewTimer(time.Second * 2)
	<-timer.C
	println("Timer expired")

}

func _tMapCopyValue() {
	var testm = map[int]*Client{}

	for i := 0; i < 10000; i++ {
		testm[i] = &Client{}
	}
}

func _tMapPointerValue() {
	var testm = map[int]Client{}

	for i := 0; i < 10000; i++ {
		testm[i] = Client{}
	}
}

var _ = Describe("client", func() {
	Context("timer", func() {
		//It("show usage", _tTimer)
		It("copy", _tMapCopyValue)
		It("point", _tMapPointerValue)
	})
})
