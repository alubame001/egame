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
func Crap(user *models.User, params BetParams, luckys string) (BetParams, error) {
	params.Lucky = luckys

	beego.Info("For Crap Game lucky :", luckys)
	//params.Icon = utils.sub(luckys[0])
	params.Icon = utils.SubString(luckys, 0, 1)
	//var result BetParams
	//nums := [][]int{{0, 0}, {1, 0}, {2, 0}, {3, 0}, {4, 0}, {5, 0}, {6, 0}, {7, 0}, {8, 0}, {9, 0}}
	//datas := make([][]string, 0, 0)
	var human = 0
	var mob = 0
	//var isGhost = false
	for j := 0; j < len(params.Pick); j++ {

		if params.Pick[j].Icon == params.Icon { //中了

			switch string(luckys[0]) {

			case "1", "2", "3", "4", "5", "6", "7", "8":
				params.Pick[j].Profit = params.Pick[j].Profit + params.Pick[j].Stake*0.98
				params.Allprofit = params.Allprofit + params.Pick[j].Stake*0.98
				break
			}

		} else {
			switch params.Icon {
			case "9":
				//isGhost = true
				params.Pick[j].Profit = params.Pick[j].Stake * -1
				params.Allprofit = params.Allprofit + params.Pick[j].Stake*-1
				break
			case "0":
				params.Pick[j].Profit = params.Pick[j].Stake * 0.01
				params.Allprofit = params.Allprofit + params.Pick[j].Stake*0.01
				break
			}

		}

		switch luckys {
		case "1", "2", "3", "4":
			human = human + 1
		case "5", "6", "7", "8":
			mob = mob + 1
		}

	}

	//beego.Info(params)

	return params, nil
}
