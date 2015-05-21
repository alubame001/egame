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

package egame

import (
	"encoding/json"
	//"fmt"
	"github.com/astaxie/beego"
	//	"github.com/astaxie/beego/orm"

	"github.com/alubame001/egame2015/modules/utils"
	"github.com/alubame001/egame2015/setting"
	//"github.com/bitly/go-simplejson"
	"log"
	//"github.com/alubame001/egame2015/modules/auth"
	//"github.com/alubame001/egame2015/modules/models"
	//"github.com/alubame001/egame2015/modules/utils"
	//"github.com/alubame001/egame2015/modules/models"
	"github.com/alubame001/egame2015/routers/base"
	"github.com/gorilla/websocket"
	"net/http"
	"time"
)

type EgameRouter struct {
	base.BaseRouter
}

/*
type BetJson struct {
	name        string
	kind        int
	total_stack int
	pick        *[]icons
}
type icons struct {
	icon  string
	stack int
}
*/
func (this *EgameRouter) Get() {
	this.Data["IsEgame"] = true
	this.TplNames = "egame/egame.html"
	this.Data["Id"] = this.GetString("id")
	this.Redirect("/egame/videopoke", 302)
	//log.Println("xsrf_token:", this.Data["xsrf_token"])
	//log.Println("xsrf_html:", this.Data["xsrf_html"])
}
func (this *EgameRouter) Videopoke() {
	this.Data["IsEgame"] = true
	this.TplNames = "egame/egame.html"
	this.Data["Id"] = "videopoke"
}

func (this *EgameRouter) Slot() {
	this.Data["IsEgame"] = true
	this.TplNames = "egame/egame.html"
	this.Data["Id"] = "slot"
}

func (this *EgameRouter) Crap() {
	this.Data["IsEgame"] = true
	this.TplNames = "egame/egame.html"
	this.Data["Id"] = "crap"

	var room = this.Ctx.Input.Param(":room")
	this.Data["Room"] = room
	beego.Info(room)
}

func (this *EgameRouter) Join() {
	log.Println("EgameRouter Join")
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

func (this *EgameRouter) Post() {
	this.TplNames = "home.html"
	this.EnableRender = false

	//uname := this.GetString("uname")
	uname := this.Ctx.GetCookie("cfd.id")
	content := this.GetString("content")
	log.Println("EgameRouter Post uname:", uname)
	if len(uname) == 0 || len(content) == 0 {
		return
	}
	beego.Info("Post")
	//	publish <- newEvent(EVENT_MESSAGE, uname, content)
}

// Fetch method handles fetch archives requests for LongPollingController.
func (this *EgameRouter) Fetch() {
	lastReceived, err := this.GetInt("lastReceived")
	if err != nil {
		return
	}

	//events := GetEvents(int(lastReceived))
	events := GetEventsByUser(int(lastReceived), this.User.NickName)
	if len(events) > 0 {
		this.Data["json"] = events
		this.ServeJson()
		return
	}

	// Wait for new message(s).
	ch := make(chan bool)
	waitingList.PushBack(ch)
	<-ch

	//this.Data["json"] = GetEvents(int(lastReceived))
	this.Data["json"] = GetEventsByUser(int(lastReceived), this.User.NickName)
	this.ServeJson()
}

//*websocket

func (this *EgameRouter) GetWebSocket() {
	this.EnableRender = false
	log.Println("EgameRouter Get")
	uname := this.GetString("uname")
	if len(uname) == 0 {
		this.Redirect("/", 302)
		return
	}

	this.Data["IsWebSocket"] = true
	this.Data["UserName"] = uname
}

// Join method handles WebSocket requests for WebSocketController.
func (this *EgameRouter) JoinWebSocket() {
	//beego.Info("IsLogin:", this.IsLogin)
	//this.Data["xsrfdata"] = template.HTML(this.XsrfFormHtml())
	this.EnableRender = false
	uname := this.GetString("uname")

	if len(uname) == 0 {
		this.Redirect("/", 302)
		return
	}

	if this.Ctx.Input.IP() == "" {
		return
	}
	// Upgrade from http request to WebSocket.
	ws, err := websocket.Upgrade(this.Ctx.ResponseWriter, this.Ctx.Request, nil, 1024, 1024)
	if _, ok := err.(websocket.HandshakeError); ok {
		http.Error(this.Ctx.ResponseWriter, "Not a websocket handshake", 400)
		return
	} else if err != nil {
		beego.Error("Cannot setup WebSocket connection:", err)
		return
	}

	if this.IsLogin {

		uname = utils.ToStr(this.User.Id)
		this.Data["uname"] = uname
		var b float64
		if balance, err := GetBalance(&this.User); err == nil {
			beego.Info("balance", balance)
			this.Data["Balance"] = balance
			b = balance
		} else {
			return
		}
		beego.Info("this.User.Id", this.User.Id)
		Join(uname, b, this.GetString("uname"), ws) // Join chat room.
	} else {
		//uname = utils.SubString(uname, 1, 4)
		Join(uname, 0, this.GetString("uname"), ws)
	}

	defer Leave(uname)

	// Message receive loop.
	for {
		_, p, err := ws.ReadMessage() //beego.Info("ReadMessage:", json(p))
		if err != nil {
			beego.Info("ReadMessage Error:", err)
			return
		}
		/*
			if []byte(p) == "disconnect" {
				publish <- newEvent(EVENT_PRIVATE, "disconnected", uname, "", "")
				return

			}
		*/
		if _, err := CheckJson(p); err != nil {
			beego.Info("CheckJson Error:", err)
			return
		}

		var bet BetParams
		if err := json.Unmarshal([]byte(p), &bet); err == nil {
			beego.Info(bet.Name)
			if bet.Ckey == "disconnect" {
				publish <- newEvent(EVENT_PRIVATE, "disconnect", "", "", "")
				//unsubscribe <- sub.Value.(Subscriber).Name
				return
			}
		} else {
			beego.Info("Unmarshal Error:", err)
			return
		}

		if this.IsLogin == false {
			this.Redirect("/login", 302)
			return
		}

		/*setting.WebsocketDelay =500时，每0.5秒充许发送一次*/ //time.Sleep(1e9 * 1) //0.05秒  1e9=1秒
		if this.IsLogin {
			seconds := int(time.Since(this.User.Updated).Nanoseconds()) / 1e6
			if seconds > 1*setting.WebsocketDelay {
				this.User.Updated = time.Now()
				if Lucky, ResultJsonStr, err := GetResult(&this.User, bet); err == nil {
					beego.Info("GetResult:", ResultJsonStr)
					publish <- newEvent(EVENT_MESSAGE, "result", uname, Lucky, ResultJsonStr)
				} else {
					beego.Info("GetResult error:", err)
				}

			} else {

				publish <- newEvent(EVENT_SYSTEM, "warning", uname, "", "Too fast")
			}
		} else {
			return
			//publish <- newEvent(EVENT_SYSTEM, "single", uname, "NeedToLogin")
		}

	}
}

//func (form *PostForm) SavePost(post *models.Post, user *models.User) error {

/*
func (router *EgameRouter) SetHash(user *models.User, key *models.Key) error {
	key.Spwd = utils.EncodePassword(utils.ToStr(time.Now()), user.Rands)
	key.Spwd = utils.SubString(key.Spwd, 0, 10)
	beego.Info("key.Spwd:", key.Spwd)
	key.Ckey = user.NickName
	key.Shash = utils.EncodeSeed(key.Spwd, user.NickName, user.nonce)
	key.Shash = utils.SubString(key.Shash, 0, 128)
}
*/

// broadcastWebSocket broadcasts messages to WebSocket users.
func broadcastWebSocket(event Event) {

	//beego.Info("broadcastWebSocket event:", event)

	if event.Type == EVENT_LEAVE { //退出讯息不发送
		return
	}
	data, err := json.Marshal(event)
	if err != nil {
		beego.Error("Fail to marshal event:", err)
		return
	}
	// Immediately send event to WebSocket users.
	for sub := subscribers.Front(); sub != nil; sub = sub.Next() {
		//beego.Info("Subscriber:", sub.Value.(Subscriber).Name)
		ws := sub.Value.(Subscriber).Conn
		if ws != nil {
			if event.Type == EVENT_JOIN {
				if sub.Value.(Subscriber).Name == event.Uid {

					if ws.WriteMessage(websocket.TextMessage, data) != nil {
						// User disconnected.
						unsubscribe <- sub.Value.(Subscriber).Name
					}
				}
			} else if event.Type == EVENT_LEAVE {
				if sub.Value.(Subscriber).Name == event.Uid {
					unsubscribe <- sub.Value.(Subscriber).Name
				}
			} else {
				if ws.WriteMessage(websocket.TextMessage, data) != nil {
					// User disconnected.
					unsubscribe <- sub.Value.(Subscriber).Name
				}
			}
		}

	}
}
