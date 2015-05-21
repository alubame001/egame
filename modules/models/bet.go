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

	"github.com/alubame001/egame/modules/utils"
	//	"github.com/alubame001/egame/setting"
)

//数据库表默认为 NOT NULL，设置 null 代表 ALLOW NULL
//unique
//orm:"default(1)"
type Bet struct {
	Id   int
	User *User `orm:"rel(fk);on_delete(do_nothing)"` // RelForeignKey relation
	//Key      *Key    `orm:"reverse(one)"`
	NickName  string  `orm:"size(60)"`
	Chance    float64 `orm:"digits(12);decimals(4);null"` //机率9999.99
	Odd       float64 `orm:"digits(12);decimals(4);null"` //赔率
	Stake     float64 `orm:"digits(20);decimals(8);null"` //投注额
	Profit    float64 `orm:"digits(20);decimals(8);null"` // 利润
	Draw      float64 `orm:"digits(20);decimals(8);null"`
	Nonce     int     `orm:"null"`
	Which     string  `orm:"size(60);null"`
	Lucky     string  `orm:"size(60);null"`
	Win       bool    `orm:"null""`
	Balance   float64 `orm:"digits(20);decimals(8);null""` //
	KeyId     string  `orm:"size(60);null"`
	IsPublish bool    `orm:"default(false)"`
	Shash     string  `orm:"size(128)"`     /** 服务器密钥Hash值 */
	Spwd      string  `orm:"size(60);null"` /** 密钥加密密码 */
	Ckey      string  `orm:"size(60)"`      /** 客户端密钥 */

	Created time.Time `orm:"auto_now_add"`
	Updated time.Time `orm:"auto_now"`

	//State     int       `orm:"default(-1)"`

}

func (m *Bet) Insert() error {
	if _, err := orm.NewOrm().Insert(m); err != nil {
		return err
	}
	return nil
}

func (m *Bet) Read(fields ...string) error {
	fmt.Print("Bet Read:", fields)
	if err := orm.NewOrm().Read(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Bet) Update(fields ...string) error {
	fields = append(fields, "Updated")
	if _, err := orm.NewOrm().Update(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Bet) Delete() error {
	if _, err := orm.NewOrm().Delete(m); err != nil {
		return err
	}
	return nil
}

func (m *Bet) String() string {
	return utils.ToStr(m.Id)
}

/*
func (m *Bet) Link() string {

		uri := m.Uri
		if len(uri) > 0 && uri[0] == '/' {
			uri = uri[1:]
		}
		return fmt.Sprintf("%s%s", setting.AppUrl, uri)

}

func (m *Bet) GetTitle(lang string) string {

		var title string
		switch i18n.IndexLang(lang) {
		case setting.LangZhCN:
			title = m.TitleZhCn
		default:
			title = m.Title
		}
		return title

	return
}

func (m *Bet) GetContentCache(lang string) string {

		var content, contentCache string
		switch i18n.IndexLang(lang) {
		case setting.LangZhCN:
			content = m.ContentZhCn
			contentCache = m.ContentCacheZhCn
		default:
			content = m.Content
			contentCache = m.ContentCache
		}
		if setting.RealtimeRenderMD {
			return utils.RenderMarkdown(content)
		} else {
			return contentCache
		}

}
*/
func Bets() orm.QuerySeter {
	return orm.NewOrm().QueryTable("Bet").OrderBy("-Id")
}

func init() {
	fmt.Print("Bet init")
	orm.RegisterModel(new(Bet))
}
