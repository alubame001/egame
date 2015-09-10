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

/*新增檔案*/
package engine

import (

	"github.com/alubame001/egame/routers/base"


)


type EngineRouter struct {
	base.BaseRouter

}
var eio EngineIO

func (this *EngineRouter) Join() {
	this.TplNames = "engine/index.html"
	
	eio.Init(Config{
		PingTimeout:   60000,
		PingInterval:  5000,
		AllowUpgrades: true,
		Transports:    []string{"polling", "websocket"},
	}, onConnection)

	defer eio.Close()
}

func onConnection(client *Client) {
	client.MessageCallback = func(c *Client, message []byte) {
		//beego.Info("pong")
		c.WriteString("pong")
	}
}
