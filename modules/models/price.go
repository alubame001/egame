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
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"time"
	//"github.com/beego/i18n"

	"github.com/alubame001/egame/modules/utils"
	//"github.com/alubame001/egame/setting"
)

type Price struct {
	Id            int
	Symbol        string `orm:"size(20);unqiue"`
	Kind          string `orm:"size(20)"`
	Eid           string `orm:"type(text)"`
	Cid           string `orm:"type(text)"`
	Price         float64
	SellPrice     float64
	BuyPrice      float64
	Change        float64
	ChangeRate    string
	Spread        float64
	SpreadUnit    float64
	FloatPosition int
	Created       time.Time `orm:"auto_now_add"`
	Updated       time.Time `orm:"auto_now"`
}

func (m *Price) Insert() error {
	if _, err := orm.NewOrm().Insert(m); err != nil {
		return err
	}
	return nil
}

func (m *Price) Read(fields ...string) error {
	if err := orm.NewOrm().Read(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Price) Update(fields ...string) error {
	fields = append(fields, "Updated")
	if _, err := orm.NewOrm().Update(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Price) Delete() error {
	if _, err := orm.NewOrm().Delete(m); err != nil {
		return err
	}
	return nil
}

func (m *Price) String() string {
	return utils.ToStr(m.Id)
}

/*
func (m *Article) Link() string {
	uri := m.Uri
	if len(uri) > 0 && uri[0] == '/' {
		uri = uri[1:]
	}
	return fmt.Sprintf("%s%s", setting.AppUrl, uri)
}

func (m *Article) GetTitle(lang string) string {
	var title string
	switch i18n.IndexLang(lang) {
	case setting.LangZhCN:
		title = m.TitleZhCn
	default:
		title = m.Title
	}
	return title
}
func (m *Price) GetContentCache(lang string) string {
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

func Prices() orm.QuerySeter {
	return orm.NewOrm().QueryTable("price").OrderBy("-Id")
}

func init() {
	fmt.Print("price init")
	orm.RegisterModel(new(Price))
	//	createRecord()
}

func createRecord() {

	prices := []Price{

		{Kind: "index", Symbol: "s_sh000001", Eid: "SSE Composite Index", Cid: "上证指数", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
		{Kind: "index", Symbol: "s_sz399001", Eid: "SZSE COMP SUB IND", Cid: "深证成指", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
		{Kind: "index", Symbol: "s_sh000300", Eid: " ", Cid: "沪深300指数", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},

		{Kind: "index", Symbol: "s_sz399005", Eid: "SZSE SME PRICE", Cid: "中小板指", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},

		{Kind: "index", Symbol: "s_sz399006", Eid: "SZSE CHINEXT", Cid: "创业板指", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
		{Kind: "index", Symbol: "s_sz000002", Eid: "万科", Cid: "万科", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},

		//	{Kind: "index", Symbol: "nb_UKX", Eid: "FTSE", Cid: "英国富时", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
		/*
			{Kind: "energy", Symbol: "hf_OIL", Eid: "Brent", Cid: "布伦特原油", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
			{Kind: "energy", Symbol: "hf_GC", Eid: "Gold", Cid: "COMEX黄金", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
		*/

		{Kind: "currency", Symbol: "USDCNY", Eid: "USD/CNY", Cid: "美元人民币", Spread: 4, SpreadUnit: 0.01, FloatPosition: 4},
		{Kind: "currency", Symbol: "EURUSD", Eid: "EUR/USD", Cid: "欧元美元", Spread: 4, SpreadUnit: 0.01, FloatPosition: 4},

		//{Kind: "index", Symbol: "HSI.HK", Eid: "HangSeng Index", Cid: "香港恒生", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
		//{Kind: "index", Symbol: "NIXI", Eid: "Nikki Index", Cid: "日经指数", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},

		//{Kind: "index", Symbol: "gb_ixic", Eid: "NASDAQ", Cid: "纳斯达克", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
		//{Kind: "index", Symbol: "^FTSE", Eid: "FTSE", Cid: "英国富时", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
		//{Kind: "index", Symbol: "gb_dji", Eid: "DJI", Cid: "道琼斯", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
		//{Kind: "index", Symbol: "gb_inx", Eid: "", Cid: "标普指数", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},

		/*
			{Kind: "currency", Symbol: "BTCUSD=X", Eid: "BTC/USD", Cid: "比特币/美元", Spread: 400, SpreadUnit: 0.01, FloatPosition: 2},
			{Kind: "currency", Symbol: "EURUSD=X", Eid: "EUR/USD", Cid: "欧元/美元", Spread: 4, SpreadUnit: 0.0001, FloatPosition: 4},
			{Kind: "currency", Symbol: "RUBUSD=X", Eid: "RUB/USD", Cid: "卢布/美元", Spread: 4, SpreadUnit: 0.0001, FloatPosition: 4},
			{Kind: "energy", Symbol: "BZF15.NYM", Eid: "Brent Crude Oil Last Day Future", Cid: "布仑特原油", Spread: 4, SpreadUnit: 0.0001, FloatPosition: 4},

			{Kind: "index", Symbol: "^IXIC", Eid: "NASDAQ", Cid: "纳斯达克", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
			{Kind: "index", Symbol: "^FTSE", Eid: "FTSE", Cid: "英国富时", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
			//{Kind: "index", Symbol: "^DJI", Eid: "DJI", Cid: "道琼斯", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
			{Kind: "index", Symbol: "^FCHI", Eid: "France_40", Cid: "法国CAC", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
			{Kind: "index", Symbol: "^HSI", Eid: "HangSeng_Index", Cid: "香港恒生", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
			{Kind: "index", Symbol: "000001.ss", Eid: "SSE_Composite_Index", Cid: "上证指数", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
			{Kind: "index", Symbol: "399001.sz", Eid: "SZSE_COMP_SUB_IND", Cid: "深证成指", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
			{Kind: "index", Symbol: "399005.sz", Eid: "SZSE_SME_PRICE", Cid: "中小板指", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
			{Kind: "index", Symbol: "399006.sz", Eid: "SZSE_CHINEXT", Cid: "创业板指", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
			{Kind: "currency", Symbol: "XAUUSD=X", Eid: "XAU/USD", Cid: "黄金", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
			{Kind: "currency", Symbol: "XAGUSD=X", Eid: "XAG/USD", Cid: "白银", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
			{Kind: "stock", Symbol: "600547.ss", Eid: "SDHJ", Cid: "山东黄金", Spread: 4, SpreadUnit: 0.01, FloatPosition: 2},
		*/
	}
	successNums, err := orm.NewOrm().InsertMulti(100, prices)
	if err == nil {
		beego.Trace("successNums:", successNums)
	} else {
		beego.Trace("err:", err)
	}

}
