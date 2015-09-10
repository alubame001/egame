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

package engine

import (
	//"log"	
	"github.com/alubame001/egame/routers/base"
	"github.com/alubame001/egame/modules/utils"
	//"github.com/bitly/go-simplejson"
	"time"
)
type Data struct {
	Sn        string  `json:"sn"`		
	Time      int  `json:"time"`		 
}
type EngineRouter struct {
	base.BaseRouter
}


func (this *EngineRouter) Join() {

}

func (this *EngineRouter) Time() {
	

}

func (this *EngineRouter) Join() {
	log.Println("EngineRouter Join")
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
		this.Redirect("/egame/lp?uname="+uname, 302)
	case "WebSocket":
		this.Redirect("/egame/ws?uname="+uname, 302)
	default:
		this.Redirect("/", 302)
	}

	// Usually put return after redirect.
	return
}

func (this *EgameRouter) JoinWebSocket() {
	//beego.Info("IsLogin:", this.IsLogin)
	//this.Data["xsrfdata"] = template.HTML(this.XsrfFormHtml())
	this.EnableRender = false
	uname := this.GetString("uname")

	if len(uname) == 0 {
		this.Redirect("/", 302)
		return
	}

	ws, err := websocket.Upgrade(this.Ctx.ResponseWriter, this.Ctx.Request, nil, 1024, 1024)
	if _, ok := err.(websocket.HandshakeError); ok {
		http.Error(this.Ctx.ResponseWriter, "Not a websocket handshake", 400)
		return
	} else if err != nil {
		beego.Error("Cannot setup WebSocket connection:", err)
		return
	}

}