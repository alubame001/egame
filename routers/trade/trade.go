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

package trade

import (
	"log"
	//"github.com/astaxie/beego/orm"

	//"github.com/alubame001/egame2015/modules/auth"
	//"github.com/alubame001/egame2015/modules/models"
	//"github.com/alubame001/egame2015/modules/utils"
	"github.com/alubame001/egame2015/routers/base"
)

type TradeRouter struct {
	base.BaseRouter
}

func (this *TradeRouter) Get() {
	this.Data["IsTrade"] = true
	this.TplNames = "trade/trade.html"

	//log.Println("xsrf_token:", this.Data["xsrf_token"])
	//log.Println("xsrf_html:", this.Data["xsrf_html"])
}
func (this *TradeRouter) Join() {
	log.Println("TradeRouter Join")
	uname := this.Ctx.GetCookie("cfd.id")
	tech := this.GetString("tech")
	if len(uname) == 0 {
		this.Redirect("/", 302)
		return
	}
	log.Println("tech", tech)
	switch tech {
	case "Long Polling", "长轮询":
		//this.Redirect("/lp?uname="+uname, 302)
		this.Redirect("/lp?uname="+uname, 302)
	case "WebSocket":
		this.Redirect("/ws?uname="+uname, 302)
	default:
		this.Redirect("/", 302)
	}

	// Usually put return after redirect.
	return
}

func (this *TradeRouter) Post() {
	this.TplNames = "home.html"
	this.EnableRender = false
	log.Println("TradeRouter Post~~~~~~~~~~~~~")
	log.Println(this.GetString("content"))
	//uname := this.GetString("uname")
	uname := this.Ctx.GetCookie("cfd.id")
	content := this.GetString("content")
	log.Println("TradeRouter Post uname:", uname)
	if len(uname) == 0 || len(content) == 0 {
		return
	}

	publish <- newEvent(EVENT_MESSAGE, uname, content)
}

// Fetch method handles fetch archives requests for LongPollingController.
func (this *TradeRouter) Fetch() {
	lastReceived, err := this.GetInt("lastReceived")
	if err != nil {
		return
	}

	events := GetEvents(int(lastReceived))
	if len(events) > 0 {
		this.Data["json"] = events
		this.ServeJson()
		return
	}

	// Wait for new message(s).
	ch := make(chan bool)
	waitingList.PushBack(ch)
	<-ch

	this.Data["json"] = GetEvents(int(lastReceived))
	this.ServeJson()
}
