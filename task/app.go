// Copyright 2013 Beego Samples authors
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

package task

import (
	//"log"
	"github.com/astaxie/beego"
	//"goweb/i18n"
	"log"

	//"strings".
	//"github.com/astaxie/beego/orm"
	//"github.com/alubame001/egame/setting"
	_ "github.com/lib/pq"
)

var langTypes []string // Languages that are supported.
//var o = orm.NewOrm()

func init() {
	beego.Trace("app.go init")

}

// baseController represents base router for all other app routers.
// It implemented some methods for the same implementation;
// thus, it will be embedded into other routers.

type baseController struct {
	beego.Controller // Embed struct that has stub implementation of the interface.

}

// AppController handles the welcome screen that allows user to pick a technology and username.
type AppController struct {
	baseController // Embed to use methods that are implemented in baseController.
}

// Get implemented Get() method for AppController.
func (this *AppController) Get() {
	this.TplNames = "home.html"
}

// Join method handles POST requests for AppController.
func (this *AppController) Join() {
	// Get form value.
	//uname := this.GetString("uname")
	uname := this.Ctx.GetCookie("cfd.id")
	tech := this.GetString("tech")

	// Check valid.
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

/*
func (this *AppController) Sendchat() {
	// Get form value.
	log.Println("Sendchat")

	// Usually put return after redirect.
	return
}
*/
