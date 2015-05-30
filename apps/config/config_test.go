package config_test

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"

	. "github.com/alubame001/egame/apps/config"
)

type Info struct {
	C0 int64
	C1 int64
}

func readConfig() {
	var info Info
	ReadConfig(&info)

	Expect(info.C0).To(BeEquivalentTo(1))
	Expect(info.C1).To(BeEquivalentTo(2))
}

var _ = Describe("config", func() {
	It("read config", readConfig)
})
