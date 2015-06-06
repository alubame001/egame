package db_test

import (
	"log"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"

	"testing"

	"github.com/alubame001/egame/apps/config"
	"github.com/astaxie/beego/orm"
)

type UserXXX struct {
	Id   int
	Name string `orm:"size(100)"`
}

func TestDb(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Db Suite")
}

var _ = BeforeSuite(func() {
	log.Println("test starting")

	config.ReadConfig(&config.Settings)
	orm.RegisterModel(new(UserXXX))
})
