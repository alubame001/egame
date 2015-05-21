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

package egame

import (
	"container/list"

	"time"

	"github.com/astaxie/beego"
	//"github.com/alubame001/egame2015/modules/models"
	"github.com/alubame001/egame2015/modules/utils"
	//"github.com/alubame001/egame2015/setting"

	//"goweb/samples/WebIM/models"
	"github.com/gorilla/websocket"
	//"goweb/data"
)

type Subscription struct {
	Archive []Event      // All the events from the archive.
	New     <-chan Event // New events coming in.
}
type Subscriber struct {
	Name    string
	Balance float64
	Hash    string
	//Ip           string
	//Delay        int
	//LastSentTime time.Time
	Conn *websocket.Conn // Only for WebSocket users; otherwise nil.
}

func newEvent(ep EventType, cmd, user, lucky, msg string) Event {

	beego.Info("newEvent :", user)
	//return Event{ep, user, int(time.Now().Unix()), msg, Martketprice{0, "", 0, 0, ""}}
	//return Event{ep, int(time.Now().Unix()), Martketprice{0, "", 0, 0, ""}}
	//var g = newGame(0, user, msg)
	return Event{ep, cmd, user, int(time.Now().Unix()), lucky, msg}
}

func Join(name string, balance float64, hash string, ws *websocket.Conn) {
	subscribe <- Subscriber{Name: name, Balance: balance, Hash: hash, Conn: ws}
}

func Leave(user string) {
	unsubscribe <- user
}

var (
	// Channel for new join users.
	subscribe = make(chan Subscriber, 1000)
	// Channel for exit users.
	unsubscribe = make(chan string, 50)
	// Send events here to publish them.
	publish = make(chan Event, 50)
	//send    = make(chan Game, 50)
	// Long polling waiting list.
	waitingList = list.New()
	subscribers = list.New()
)

// This function handles all incoming chan messages.
func chatroom() {
	for {
		select {
		case sub := <-subscribe:
			if !isUserExist(subscribers, sub.Name) {
				subscribers.PushBack(sub) // Add user to the end of list.
				// Publish a JOIN event.
				//func newEvent(ep EventType, cmd, user, msg string) Event {

				//var s = userOnlineAmount(subscribers)
				//var s = utils.EncodeMd5(utils.ToStr(sub.Balance))
				var s = utils.ToStr(sub.Balance)
				publish <- newEvent(EVENT_JOIN, "join", sub.Name, "", s)
				//beego.Info("Balance:", s)
				beego.Info("Player Join:", sub.Name)
				//beego.Info("Total User Online:", s)
				beego.Info("New user:", sub.Name, ";WebSocket:", sub.Conn != nil)
			} else {
				if kickUser(subscribers, sub.Name) {
					//subscribers.PushBack(sub)
					var s = userOnlineAmount(subscribers)
					publish <- newEvent(EVENT_ALREADY_ONLINE, "already_online", sub.Name, "", s)
				}
				var s = utils.ToStr(sub.Balance)
				publish <- newEvent(EVENT_JOIN, "join", sub.Name, "", s)
				beego.Info("Old user:", sub.Name, ";WebSocket:", sub.Conn != nil)
			}
		case event := <-publish:
			// Notify waiting list.
			//beego.Info("2")
			//beego.Info("case event := <-publish:")
			for ch := waitingList.Back(); ch != nil; ch = ch.Prev() {
				ch.Value.(chan bool) <- true
				waitingList.Remove(ch)
			}

			//beego.Info("sleep from:", time.Now())
			//time.Sleep(1e7 * 5) //0.05秒  1e9=1秒
			broadcastWebSocket(event)
			NewArchive(event)
			if event.Type < 2 { //0是使用者下线，1是使用者下线

			} else {

			}
		case unsub := <-unsubscribe:
			for sub := subscribers.Front(); sub != nil; sub = sub.Next() {
				if sub.Value.(Subscriber).Name == unsub {
					subscribers.Remove(sub)
					// Clone connection.
					ws := sub.Value.(Subscriber).Conn
					if ws != nil {
						ws.Close()
						beego.Error("WebSocket closed:", unsub)
					}
					var s = userOnlineAmount(subscribers)
					beego.Info("UserOnline:", s)
					//publish <- newEvent(EVENT_LEAVE, unsub, s) // Publish a LEAVE event.
					break
				}
			}
		}

	}
}

func init() {
	go chatroom()
}

//beego.Info("leave:", sub.Name)
func isUserExist(subscribers *list.List, user string) bool {

	for sub := subscribers.Front(); sub != nil; sub = sub.Next() {
		if sub.Value.(Subscriber).Name == user {

			return true
		}
	}
	return false
}
func kickUser(subscribers *list.List, user string) bool {

	for sub := subscribers.Front(); sub != nil; sub = sub.Next() {
		if sub.Value.(Subscriber).Name == user {
			beego.Info("leave:", sub.Value.(Subscriber).Name)
			Leave(sub.Value.(Subscriber).Name) //踢掉之前的连线
			return true
		}
	}
	return false
}
func userOnlineAmount(subscribers *list.List) string {
	var i = 0
	for sub := subscribers.Front(); sub != nil; sub = sub.Next() {

		i = i + 1
	}
	var s = utils.ToStr(i)
	return s
}
