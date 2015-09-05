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

package video

import (
	//"log"
	"github.com/astaxie/beego"
	//"github.com/astaxie/beego/orm"

	//"github.com/alubame001/egame/modules/auth"
	//"github.com/alubame001/egame/modules/models"
	//"github.com/alubame001/egame/modules/utils"
	"github.com/alubame001/egame/routers/base"
)

type VideoRouter struct {
	base.BaseRouter
}

func (this *VideoRouter) Get() {
	this.Data["isVideo"] = true
	this.TplNames = "video/video.html"

}

func (this *VideoRouter) Betlol() {
	this.EnableRender = false
	uname := this.GetString("uname")
	bs1 := this.GetString("bs1")
	beego.Info(uname);
	beego.Info(bs1);
   


/*
	if len(uname) == 0 {
	this.Redirect("/video", 302)
	return
	}
*/
	if this.Ctx.Input.IP() == "" {
	return
	}
	
	/*
	this.TplNames = "home.html"
	this.EnableRender = false
	log.Println("VideoRouter Post")
	log.Println(this.GetString("content"))
	//uname := this.GetString("uname")
	uname := this.Ctx.GetCookie("cfd.id")
	content := this.GetString("content")
	log.Println("VideoRouter Post uname:", uname)
	if len(uname) == 0 || len(content) == 0 {
		return
	}

	publish <- newEvent(EVENT_MESSAGE, uname, content)
	*/
}

