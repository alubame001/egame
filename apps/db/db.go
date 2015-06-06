package db

import (
	"log"
	"fmt"
	"strings"

	"github.com/alubame001/egame/apps/config"
	"github.com/astaxie/beego/orm"
	_ "github.com/lib/pq"
)

const (
	BTC     = "btc"
	LTC     = "ltc"
	YBC     = "ybc"
	DEFAULT = "default"
)

func NewORM(db string) (ormer orm.Ormer, err error) {
	ormer = orm.NewOrm()

	if db == "" || db == DEFAULT {
		return
	}
	
	log.Printf("use db '%s' \n", db)
	
	if err = ormer.Using(db); err != nil {
		return nil, err
	}

	return ormer, nil
}

func Setup() (err error) {
	for db, option := range config.Settings.Db {
		var index = strings.IndexByte(option.Url, ':')
		if index < 1 {
			return fmt.Errorf("db url %s schame not found", option.Url)
		}
		err = orm.RegisterDataBase(db, option.Url[0:index], option.Url, 30)
		if err != nil {
			return
		}
	}

	return nil
}
