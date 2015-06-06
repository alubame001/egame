package db_test

import (
	"fmt"

	. "github.com/alubame001/egame/apps/db"
	"github.com/astaxie/beego/orm"

	. "github.com/onsi/ginkgo"
	//. "github.com/onsi/gomega"
)

func SS() {
	Setup()

	orm.RunSyncdb("btc", false, true)
	orm.RunSyncdb("ltc", false, true)

	var ormer,err = NewORM(BTC)
	if err!=nil{
		panic(err)
	}

	user := UserXXX{Name: "slene"}

	id, err := ormer.Insert(&user)
	fmt.Printf("ID: %d, ERR: %v\n", id, err)

	//	var posts []*UserXXX
	//	qs := ormer.QueryTable("user")
	//	qs.All(&posts)

}

var _ = Describe("Db", func() {
	It("Echo", SS)
})
