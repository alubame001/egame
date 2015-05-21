// Copyright 2013 wetalk authors
//
// Licensed under the Apache License, Version 2.0 (the "License"): you may
// not use this file except in compliance with the License. You may obtain
// a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

package models

import (
	"fmt"
	"time"

	"github.com/astaxie/beego/orm"
	//	"github.com/beego/i18n"

	"github.com/alubame001/egame2015/modules/utils"
	//	"github.com/alubame001/egame2015/setting"
)

//数据库表默认为 NOT NULL，设置 null 代表 ALLOW NULL
//unique
//orm:"default(1)"

type Deposit struct {
	Id            int
	User          *User     `orm:"rel(fk)"`                           // `orm:"reverse(one)"`                      //`orm:"rel(fk)"`
	Wallet        string    `orm:"size(128);null"`                    /**钱包地址*/
	BindWallet    string    `orm:"size(128);null"`                    /**绑定提款钱包地址*/
	Balance       float64   `orm:"digits(20);decimals(8);default(0)"` // 可用余额
	Bonus         float64   `orm:"digits(20);decimals(8);default(0)"` // 奖赏
	FreezeBalance float64   `orm:"digits(20);decimals(8);default(0)"` // Freeze 可能是系统关键字
	Assets        float64   `orm:"digits(20);decimals(8);default(0)"` /**总资产(=可用余额+冻结资产)*/
	Profit        float64   `orm:"digits(20);decimals(8);default(0)"` /**投注获利*/
	Unbilled      float64   `orm:"digits(20);decimals(8);default(0)"` /**未入账金额*/
	Unlock        time.Time `orm:"auto_now"`                          /*後台用，此钱包一切提款行为在此日期後才生效。在此之前一律冻结*/
	Created       time.Time `orm:"auto_now_add"`
	Updated       time.Time `orm:"auto_now"`
}

func (m *Deposit) Insert() error {
	if _, err := orm.NewOrm().Insert(m); err != nil {
		return err
	}
	return nil
}

func (m *Deposit) Read(fields ...string) error {
	fmt.Print("Deposit Read:", fields)
	if err := orm.NewOrm().Read(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Deposit) Update(fields ...string) error {
	fields = append(fields, "Updated")
	if _, err := orm.NewOrm().Update(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Deposit) Delete() error {
	if _, err := orm.NewOrm().Delete(m); err != nil {
		return err
	}
	return nil
}

func (m *Deposit) String() string {
	return utils.ToStr(m.Id)
}

func Deposits() orm.QuerySeter {
	return orm.NewOrm().QueryTable("Deposit").OrderBy("-Id")
}

func init() {
	fmt.Print("Deposit init")
	orm.RegisterModel(new(Deposit))
}
