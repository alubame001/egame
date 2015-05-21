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
	"log"
)

// LongPollingController handles long polling requests.
type LongPollingController struct {
	baseController
}

// Join method handles GET requests for LongPollingController.
func (this *LongPollingController) Join() {
	// Safe check.
	log.Println("LongPollingController Join")
	uname := this.GetString("uname")
	if len(uname) == 0 {
		this.Redirect("/", 302)
		return
	}

	// Join chat room.
	Join(uname, nil)

	this.TplNames = "home.html"
	this.EnableRender = true
	this.Data["IsLongPolling"] = true
	this.Data["UserName"] = uname
}

// Post method handles receive messages requests for LongPollingController.
func (this *LongPollingController) Post() {
	this.TplNames = "home.html"
	this.EnableRender = false
	log.Println("LongPollingController Post~~~~~~~~~~~~~")
	log.Println(this.GetString("content"))
	//uname := this.GetString("uname")
	uname := this.Ctx.GetCookie("cfd.id")
	content := this.GetString("content")
	log.Println("LongPollingController Post uname:", uname)
	if len(uname) == 0 || len(content) == 0 {
		return
	}

	publish <- newEvent(EVENT_MESSAGE, uname, content)
}

// Fetch method handles fetch archives requests for LongPollingController.
func (this *LongPollingController) Fetch() {
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
