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
/*written by Ray */
package api

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"github.com/bitly/go-simplejson"
	_ "github.com/lib/pq"
	"strings"
)

type Response2 struct {
	Page int `json:"page"`

	Fruits []string `json:"fruits"`
}

type content struct {
	Id   int    `json:"id"`
	Nick string `json:"nick"`
}

// Post method handles receive messages requests for LongPollingController.
/*

*/
func (this *ApiRouter) Category() error {
	/*
		待完成:需增加一个资料表格权限设定
	*/
	uid := this.GetString("uid")
	//if aid != nil {
	beego.Trace("param:", uid)
	//}
	o := orm.NewOrm()
	o.Using("default")
	this.EnableRender = false
	var category = this.Ctx.Input.Param(":category")
	var i = strings.Count(category, "") - 2
	//beego.Trace("count:", i)
	var table = category[:i] // arefun := x[i+1:]
	beego.Trace("table:", table)
	if true {
		var list orm.ParamsList
		var err error
		//var query = ""
		if len(uid) > 0 {

			_, err = o.Raw("SELECT row_to_json(q)  as result FROM (select * from "+table+" where uid = '"+uid+"' order by id ) q").ValuesFlat(&list, "result")
			//_, err = o.Raw("SELECT row_to_json(q)  as result FROM (select * from ? where uid = ? order by id ) q", table, uid).ValuesFlat(&list, "result")
		} else {
			_, err = o.Raw("SELECT row_to_json(q)  as result FROM (select * from "+table+" order by id ) q").ValuesFlat(&list, "result")
		}

		if err == nil {
			str := ""
			for i := 0; i < len(list); i++ {
				if i == len(list)-1 {
					str = str + list[i].(string)
				} else {
					str = str + list[i].(string) + ","
				}
			}
			str1 := `{"` + category + `":[`
			str2 := `]}`
			str3 := str1 + str + str2

			js, err := simplejson.NewJson([]byte(str3))
			if err != nil {
				panic("json format error")
			}
			this.Data["json"] = js
			this.ServeJson(true)
		} else {
			beego.Trace("err:", err)
			panic(err)
		}
	}

	return nil
}
