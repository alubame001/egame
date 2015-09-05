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

package home

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
type HomeRouter struct {
	base.BaseRouter
}

func (this *HomeRouter) Get() {
	this.Data["IsHome"] = true
	this.TplNames = "home/home.html"


}
func (this *HomeRouter) Time() {
	var data Data

	data.Sn =utils.GetNextSn()
	data.Time = int(time.Now().Unix())
/*
	if b, err := json.Marshal(data); err == nil {
			ResultJsonStr = string(b)
		} else {
			beego.Info("json Marshal err:", err)
			
	}
	*/
	/*

		str1 := `{"` + "sn" + `":`
		str2 := utils.GetNextSn()
		str3 := `}`
		str2 := str1 + str2 + str3


	var str = utils.GetNextSn()
	this.EnableRender = false
	js, err := simplejson.NewJson([]byte(str))
	if err != nil {
	panic("json format error")
	}
	*/
	this.Data["json"] = data
	this.ServeJson(true)

}
