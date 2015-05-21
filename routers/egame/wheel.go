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
	"github.com/alubame001/egame2015/modules/models"
	"github.com/alubame001/egame2015/modules/utils"
	"github.com/astaxie/beego"
)

/* fro crap game * old rule was 0.8 0.15*/
func Wheel(user *models.User, params BetParams, luckys string) (BetParams, error) {

	beego.Info("For Wheel Game lucky :", luckys)
	//var roll = utils.Int(luckys) / 10000
	var lucky = 0
	if roll, err := utils.StrTo(luckys).Int(); err == nil {
		lucky = roll % 12
		if lucky == 0 {
			lucky = 12
		}
		params.Lucky = luckys
		params.Icon = utils.ToStr(lucky)
	} else {
		return params, err
	}

	//var lucky =
	//var isGhost = false
	beego.Info("lucky icon:", lucky)
	for j := 0; j < len(params.Pick); j++ {

		if params.Pick[j].Icon == params.Icon { //中了
			params.Pick[j].Profit = params.Pick[j].Profit + params.Pick[j].Stake*10.76
			params.Allprofit = params.Allprofit + params.Pick[j].Stake*10.76
		} else {
			params.Pick[j].Profit = params.Pick[j].Stake * -1
			params.Allprofit += params.Pick[j].Stake * -1
		}

	}
	//如果大於999996则中彩金
	//beego.Info(params)
	beego.Info("params:", params)
	return params, nil
}
