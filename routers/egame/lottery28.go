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
	//"math/big"
	"strconv"
)

/* fro crap game * old rule was 0.8 0.15*/
func Lottery28(user *models.User, params BetParams, luckys string) (BetParams, error) {
	params.Lucky = luckys

	beego.Info("For Lottery28 Game lucky :", luckys)
	//params.Icon = utils.sub(luckys[0])
	//n1, err := ParseInt(utils.SubString(luckys, 0, 1), 10, 0)
	//n2, err := ParseInt(utils.SubString(luckys, 1, 1), 10, 0)
	//n3, err := ParseInt(utils.SubString(luckys, 2, 1), 10, 0)
	var result_number = 0
	if n1, err := strconv.Atoi(utils.SubString(luckys, 0, 1)); err != nil {
		return params, err
	} else {
		result_number += n1
	}
	if n2, err := strconv.Atoi(utils.SubString(luckys, 1, 1)); err != nil {
		return params, err
	} else {
		result_number += n2
	}
	if n3, err := strconv.Atoi(utils.SubString(luckys, 2, 1)); err != nil {
		return params, err
	} else {
		result_number += n3
	}
	//n1 := utils.SubString(luckys, 0, 1)
	//n2 := utils.SubString(luckys, 1, 1)
	//n3 := utils.SubString(luckys, 2, 1)
	result := utils.ToStr(result_number)
	rate := 0.98
	/*

		r := new(big.Rat)
		stake := new(big.Rat)
		profit := new(big.Rat)
		allprofit := new(big.Rat)
		odd := new(big.Rat)
		odd_org := new(big.Rat)
		r.SetFloat64(0.98)
		stake.SetFloat64(0)
		profit.SetFloat64(0)
		allprofit.SetFloat64(0)
		odd.SetFloat64(0)
		odd_org.SetFloat64(1)
	*/
	params.Icon = result
	params.Total = 0
	//isWin := false
	for j := 0; j < len(params.Pick); j++ {
		if value, err := utils.Float64Add(params.Total, params.Pick[j].Stake, 8); err == nil {
			params.Total = value
		}
		if params.Pick[j].Icon == params.Icon { //中了
			//	isWin = true
			switch params.Icon {

			case "0", "27":
				if profit_result, _ := utils.CalcProfit(rate, params.Pick[j].Stake, 1000); profit_result != 0 {
					params.Pick[j].Profit = profit_result
					if value, err := utils.Float64Add(params.Allprofit, params.Pick[j].Profit, 8); err == nil {
						params.Allprofit = value
					}
				}

				break

			case "1", "26":
				//params.Pick[j].Profit = params.Pick[j].Profit + params.Pick[j].Stake*333*rate
				//params.Allprofit = params.Pick[j].Profit
				if profit_result, _ := utils.CalcProfit(rate, params.Pick[j].Stake, 333); profit_result != 0 {
					params.Pick[j].Profit = profit_result
					if value, err := utils.Float64Add(params.Allprofit, params.Pick[j].Profit, 8); err == nil {
						params.Allprofit = value
					}
				}

				break

			case "2", "25":
				if profit_result, _ := utils.CalcProfit(rate, params.Pick[j].Stake, 166); profit_result != 0 {
					params.Pick[j].Profit = profit_result
					if value, err := utils.Float64Add(params.Allprofit, params.Pick[j].Profit, 8); err == nil {
						params.Allprofit = value
					}
				}
				break

			case "3", "24":
				if profit_result, _ := utils.CalcProfit(rate, params.Pick[j].Stake, 100); profit_result != 0 {
					params.Pick[j].Profit = profit_result
					if value, err := utils.Float64Add(params.Allprofit, params.Pick[j].Profit, 8); err == nil {
						params.Allprofit = value
					}
				}
				break

			case "4", "23":
				if profit_result, _ := utils.CalcProfit(rate, params.Pick[j].Stake, 66); profit_result != 0 {
					params.Pick[j].Profit = profit_result
					if value, err := utils.Float64Add(params.Allprofit, params.Pick[j].Profit, 8); err == nil {
						params.Allprofit = value
					}
				}
				break

			case "5", "22":
				if profit_result, _ := utils.CalcProfit(rate, params.Pick[j].Stake, 48); profit_result != 0 {
					params.Pick[j].Profit = profit_result
					if value, err := utils.Float64Add(params.Allprofit, params.Pick[j].Profit, 8); err == nil {
						params.Allprofit = value
					}
				}
				break

			case "6", "21":
				if profit_result, _ := utils.CalcProfit(rate, params.Pick[j].Stake, 36); profit_result != 0 {
					params.Pick[j].Profit = profit_result
					if value, err := utils.Float64Add(params.Allprofit, params.Pick[j].Profit, 8); err == nil {
						params.Allprofit = value
					}
				}
				break

			case "7", "20":
				if profit_result, _ := utils.CalcProfit(rate, params.Pick[j].Stake, 28); profit_result != 0 {
					params.Pick[j].Profit = profit_result
					if value, err := utils.Float64Add(params.Allprofit, params.Pick[j].Profit, 8); err == nil {
						params.Allprofit = value
					}
				}
				break

			case "8", "19":
				if profit_result, _ := utils.CalcProfit(rate, params.Pick[j].Stake, 22); profit_result != 0 {
					params.Pick[j].Profit = profit_result
					if value, err := utils.Float64Add(params.Allprofit, params.Pick[j].Profit, 8); err == nil {
						params.Allprofit = value
					}
				}
				break

			case "9", "18":
				if profit_result, _ := utils.CalcProfit(rate, params.Pick[j].Stake, 18); profit_result != 0 {
					params.Pick[j].Profit = profit_result
					if value, err := utils.Float64Add(params.Allprofit, params.Pick[j].Profit, 8); err == nil {
						params.Allprofit = value
					}
				}
				break

			case "10", "17":
				if profit_result, _ := utils.CalcProfit(rate, params.Pick[j].Stake, 16); profit_result != 0 {
					params.Pick[j].Profit = profit_result
					if value, err := utils.Float64Add(params.Allprofit, params.Pick[j].Profit, 8); err == nil {
						params.Allprofit = value
					}
				}
				break

			case "11", "16":
				if profit_result, _ := utils.CalcProfit(rate, params.Pick[j].Stake, 15); profit_result != 0 {
					params.Pick[j].Profit = profit_result
					if value, err := utils.Float64Add(params.Allprofit, params.Pick[j].Profit, 8); err == nil {
						params.Allprofit = value
					}
				}
				break

			case "12", "15":
				if profit_result, _ := utils.CalcProfit(rate, params.Pick[j].Stake, 14); profit_result != 0 {
					params.Pick[j].Profit = profit_result
					if value, err := utils.Float64Add(params.Allprofit, params.Pick[j].Profit, 8); err == nil {
						params.Allprofit = value
					}
				}
				break

			case "13", "14":
				if profit_result, _ := utils.CalcProfit(rate, params.Pick[j].Stake, 13); profit_result != 0 {
					params.Pick[j].Profit = profit_result
					if value, err := utils.Float64Add(params.Allprofit, params.Pick[j].Profit, 8); err == nil {
						params.Allprofit = value
					}
				}
				break
			}

		} else {
			if params.Pick[j].Stake*-1 < 0 {
				params.Pick[j].Profit = params.Pick[j].Stake * -1
			}

			if value, err := utils.Float64Sub(params.Allprofit, params.Pick[j].Stake, 8); err == nil {
				params.Allprofit = value
			}

		}

	}

	beego.Info("Lottery28:", params)
	/*
		r := new(big.Rat)
		a := new(big.Rat)
		b := new(big.Rat)
		c := new(big.Rat)
		a.SetFloat64(0.1)
		b.SetFloat64(0.2)
		c.SetFloat64(0.3)
		r.Add(a, b)
		r.Add(r, c)
		beego.Info(r.FloatString(3))
	*/
	return params, nil
}
