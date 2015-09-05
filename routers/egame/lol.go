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
	"github.com/alubame001/egame/modules/models"
	"github.com/alubame001/egame/modules/utils"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/validation"
	"errors"
	"time"
	//"math/big"
	//"strconv"
)

func Lol(user *models.User, params BetParams, luckys string) (BetParams, error) {

	 if result:=isIconValid(params);result == false{
	 	return params,errors.New("Input Params Icon Error")
	 }

	 if result:=isStakeValid(params);result == false{
	 	return params,errors.New("Input Params Stake Error")
	 }	 

	 if result:=isSnValid(params);result == false{
	 	return params,errors.New("Sn Error")
	 }	  

	 if result:=isTimeValid(params);result == false{
	 	return params,errors.New("Time Error")
	 }		 
    // o

	/*
	需写入bet.stake bet.profit, stake 应为此单号下的所有投注金额，profit应为0
	*/
	for j := 0; j < len(params.Pick); j++ {
		//params.Allprofit = params.Pick[j].Stake*-1
		if value, err := utils.Float64Add(params.Total, params.Pick[j].Stake, 8); err == nil {
			params.Total = value
		}
	}
	params.Allprofit = params.Total *-1
	beego.Info("lol params :", params)

	
	return params, nil
}


//{"name":"video","kind":"lol","pick":[{"icon":"5","stake":100}],"sn":"1509021736"}
func isParamsValid(params BetParams) (bool ,error) {
	beego.Info(params)

  //  valid.Required(params.Name, "name")

    if  params.Name != "video" {
    	return false, errors.New("Input Params.Name  Error")
    }	

    if  params.Kind != "lol" {
    	return false, errors.New("Input Params.Kind  Error")
    }


    valid := validation.Validation{}
    valid.MaxSize(params.Sn,10, "snMax")

    if valid.HasErrors() {
        // 如果有错误信息，证明验证没通过
        // 打印错误信息
        for _, err := range valid.Errors {
           beego.Info(err.Key, err.Message)
        }
        return false, errors.New("Input Params isParamsValid Error")
    }


	return true, nil
}
func isIconValid(params BetParams) (bool) {
	for j := 0; j < len(params.Pick); j++ {		
		var icon = params.Pick[j].Icon
		switch icon {
			case "0","1","2","3","4","5","6","7","8","9","dxd","dxx","dsd","dss","zbz","zbb","ywy","yww","jyj","jyy":
				return  true			
			default:
				return false
		}		
	}
	return false
}
func isStakeValid(params BetParams) (bool) {
	for j := 0; j < len(params.Pick); j++ {		
		var stake = params.Pick[j].Stake
		if  stake < 0 {
			return false
		}
	}
	return true
}
/*
检查客户端传过来的投注期号(sn)，是否在该期有效投注时间内
*/
func isSnValid(params BetParams) (bool) {
	
    //var nextSn = utils.ToStr(year*100000000) +utils.ToStr(m*1000000)+utils.ToStr(day*10000)+utils.ToStr(hour*100)+utils.ToStr(min)
    beego.Info("Sn is ",utils.GetNextSn())

    if params.Sn == utils.GetNextSn() {
    	return true
    }

	return false
}

func isTimeValid(params BetParams) (bool) {
	now := time.Now()
    _,_,sec := now.Clock()
    if sec <= 30 {
    	return true
    }
	return false
}
//参考 http://beego.me/docs/mvc/controller/validation.md