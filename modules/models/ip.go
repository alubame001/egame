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
	//"github.com/beego/i18n"

	"github.com/alubame001/egame/modules/utils"
	//"github.com/alubame001/egame/setting"
)

// post content
type Ip struct {
	Id      int
	User    *User     `orm:"rel(fk)"`
	Address string    `orm:"size(20)"`
	Created time.Time `orm:"auto_now_add"`
}

func (m *Ip) Insert() error {
	fmt.Print("ip:", m)
	if _, err := orm.NewOrm().Insert(m); err != nil {
		return err
	}
	return nil
}

func (m *Ip) Read(fields ...string) error {
	if err := orm.NewOrm().Read(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Ip) Update(fields ...string) error {
	if _, err := orm.NewOrm().Update(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Ip) Delete() error {
	if _, err := orm.NewOrm().Delete(m); err != nil {
		return err
	}
	return nil
}

func (m *Ip) String() string {
	return utils.ToStr(m.Id)
}

/*
func (m *Ip) GetLang() string {
	return i18n.GetLangByIndex(m.Lang)
}
*/
func Ips() orm.QuerySeter {
	return orm.NewOrm().QueryTable("ip").OrderBy("-Id")
}

func init() {
	orm.RegisterModel(new(Ip))
}
