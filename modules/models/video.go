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

package models

import (
//	"fmt"
	"time"

	"github.com/astaxie/beego/orm"
	//"github.com/beego/i18n"

	//"github.com/alubame001/egame/modules/utils"
	//"github.com/alubame001/egame/setting"
)

// post content
type Video struct {
	Id      int	
	Symbol string    `orm:"size(10)"`
	Sn string    `orm:"size(20)"` //期号
	Nr int    			//中奖号码
	Nr0 bool   
	Nr1 bool   
	Nr2 bool   
	Nr3 bool   
	Nr4 bool   
	Nr5 bool   
	Nr6 bool   
	Nr7 bool   
	Nr8 bool   
	Nr9 bool   
	Dxd bool    //大
	Dxx bool    //小
	Dsd bool    //单
	Dss bool    //双
	Zbz bool 	  //中	
	Zbb bool	  //边	 
	Ywy bool	  //有蓝	 
	Yww bool    //无蓝 
	Jyj  bool	  //近战
	Jyy  bool   //远程		
	Created time.Time `orm:"auto_now_add"`
}

func Videos() orm.QuerySeter {
	return orm.NewOrm().QueryTable("video").OrderBy("-Sn")
}

func init() {
	orm.RegisterModel(new(Video))
}
// 多字段唯一键
func (u *Video) TableUnique() [][]string {
    return [][]string{
        []string{"Symbol", "Sn"},
    }
}