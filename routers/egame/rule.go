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
	/*


		"github.com/astaxie/beego"

		"github.com/alubame001/egame/setting"

		"log"
		"github.com/alubame001/egame/modules/auth"
		"github.com/alubame001/egame/modules/models"


		"github.com/alubame001/egame/routers/base"
		"github.com/gorilla/websocket"
		"net/http"
		"time"
	*/
	"encoding/json"
	"errors"
	"fmt"
	"github.com/alubame001/egame/modules/models"
	"github.com/alubame001/egame/modules/utils"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"github.com/bitly/go-simplejson"
	//"github.com/alubame001/egame/modules/utils"
)

type BetParams struct {
	Name      string  `json:"name"`		 //video
	Kind      string  `json:"kind"`		 //lol	
	Balance   float64 `json:"balance"`   //回传 显示此次投注後玩家馀额
	Allprofit float64 `json:"allprofit"` //回传 显示此次投注後玩家馀额
	Total     float64 `json:"total"`     //玩家传来总投注金额，系统回传此次投注结果。
	Pick      []Icon  `json:"pick"`      //适用於复选
	Pk        []Icon  `json:"pk"`        //适用於复选
	Lucky     string  `json:"lucky"`     //回传
	Shash     string  `json:"shash"`     //回传
	Ckey      string  `json:"ckey"`      //回传
	Nonce     string  `json:"nonce"`     //回传
	Betid     string  `json:"betid"`     //回传
	Icon      string  `json:"icon"`      //回传
	Sn        string  `json:"sn"`        //玩家传来的投注期次，只有lol会用到这资料。
}
type Icon struct {
	Icon   string  `json:"icon"`
	Stake  float64 `json:"stake"`
	Profit float64 `json:"profit"` //玩家传来此项目投注金额，系统回传此项目投注结果。
}

/*
type Pk struct {
	Big   int `json:"big"`   //玩家传来此项目投注金额，系统回传此项目投注结果。
	Small int `json:"small"` //玩家传来此项目投注金额，系统回传此项目投注结果。
}
*/
func GameRule(user *models.User, params BetParams, luckys string) (BetParams, error) {
	//beego.Info("params:", params)
	//beego.Info("user:", user)
	/*待完成 params 检查 */
	var result BetParams
	switch params.Kind {
	case "wheel":
		return Wheel(user, params, string(luckys))
	case "crap":
		return Crap(user, params, string(luckys[0]))
	case "lottery28":
		return Lottery28(user, params, string(luckys))
	case "lol":
		return Lol(user, params, string(luckys))		
	default:
		return params, errors.New("Input Params Error")
	}

	return result, nil
}

//待完成:检查客户传来的投注细项和总计是否相符。

//如果资料中没有name和kind的资料，就视为无效
func CheckJson(json []byte) (bool, error) {
	js, err := simplejson.NewJson(json)
	if err != nil {
		//panic(err.Error())
		return false, err
	}

	//	beego.Info("js:", js)
	s, err := js.Get("name").String()
	if err != nil {
		beego.Info("decode error: get int failed!")
		return false, err
	}
	if s == "" {
		fmt.Println(s)
	}
	t, err := js.Get("kind").String()
	if err != nil {
		beego.Info("decode error: get int failed!")
		return false, err
	}
	if t == "" {
		fmt.Println(t)
	}
	return true, nil

}

func CheckBetParam(params BetParams) (BetParams, error) {
	params.Total = 0
	newFloat64 := params.Total
	//check_convert(ok)
	//fmt.Println("newFloat64 的值本来是", newFloat64)
	//newFloat64 += 2.0
	newFloat64 = 0

	for j := 0; j < len(params.Pick); j++ {
		var b = params.Pick[j].Stake

		if b < 0 {
			return params, errors.New("输入的投注小於零")
		} else {
			//params.Total = params.Total + b
			//newFloat64 += b
			beego.Info("pick", j, ":", newFloat64)

			if value, err := utils.Float64Add(params.Total,b, 8); err == nil {
					params.Total = utils.Round(value, 8)
			}else {
				return params, err	
			}


		}
	}
	//params.Total = utils.Round(newFloat64, 8)
	beego.Info("params.Total ", ":", params.Total)
	return params, nil

}

func GetBalance(user *models.User) (float64, error) {
	cond := orm.NewCondition()
	cond = cond.And("User", user)
	o := orm.NewOrm()

	var deposit models.Deposit
	if err := o.QueryTable("deposit").SetCond(cond).Limit(1).OrderBy("-created").One(&deposit); err == nil {
		return deposit.Balance, nil
	} else {
		return 0, err
	}
}

func GetResult(user *models.User, params BetParams) (string, string, error) {
	var isPending = false
 	switch params.Kind {
		case "lol":
			isPending= true		
		default:
			isPending= false		
	}	
	beego.Info("params:", params)
	var ResultJsonStr = ""
	var Lucky = ""
	var newParams = params
	//var resultParams BetParams
	cond := orm.NewCondition()
	cond = cond.And("User", user)
	var anyError = false
	o := orm.NewOrm()
	var err = o.Begin()
	var shash = ""
	// 事务处理过程开始
	var balance = float64(0)
	var deposit models.Deposit
	if checkedParams, err := CheckBetParam(params); err != nil {
		beego.Info("err:", err)
		anyError = true
	} else {
		newParams = checkedParams
		newParams = params
		beego.Info("newParams:", newParams)
	}

	if err := o.QueryTable("deposit").SetCond(cond).Limit(1).OrderBy("-created").One(&deposit); err == nil {
		balance = deposit.Balance
		beego.Info("balance", balance)
		if balance < newParams.Total {
			beego.Info("err:", "not enought balance")
			anyError = true
		}

	} else {
		if err == orm.ErrMultiRows {
			// 多条的时候报错
			beego.Info("err:", err)
			anyError = true
		}
		if err == orm.ErrNoRows {
			// 没有找到记录
			beego.Info("err:", err)
			anyError = true
		}

	}
	
	var key models.Key
	err = o.QueryTable("key").SetCond(cond).Limit(1).OrderBy("-created").One(&key)
	if err == orm.ErrMultiRows {
		// 多条的时候报错
		beego.Info("err:", err)
		anyError = true
	}
	if err == orm.ErrNoRows {
		// 没有找到记录
		beego.Info("err:", err)
		anyError = true
	}

	shash = utils.EncodeSeed(key.Spwd, key.Ckey, utils.ToStr(key.Nonce))
	newParams.Shash = shash
	newParams.Nonce = utils.ToStr(key.Nonce)
	newParams.Ckey = key.Ckey
	if res, err := o.Raw("UPDATE key SET nonce = nonce+1 WHERE id = ?", key.Id).Exec(); err != nil {
		anyError = true
		beego.Info("err:", err)
	} else {
		num, err := res.RowsAffected()
		fmt.Println("key table row affected nums: ", num)
		if num != 1 {
			beego.Info("err:", err)
			anyError = true
		}
	}

	if lucky, err := utils.GetLuckyFromShash(shash); err == nil {
		//if lucky, err := utils.GetLuckyFromString(shash, 0, 9); err == nil {
		beego.Info("GetLuckyFromShash:", Lucky)
		Lucky = lucky
	} else {
		beego.Info("err:", err)
		anyError = true
	}
	//var bet models.Bet
	if gameresult, err := GameRule(user, newParams, Lucky); err == nil {		
		if true {
			var bet models.Bet
			bet.User = user
			bet.NickName = user.NickName

			bet.Nonce = key.Nonce
			bet.Shash = shash 
			bet.Ckey = key.Ckey
			bet.Lucky = gameresult.Lucky
			bet.Stake = gameresult.Total
			if isPending == true {
			   bet.Profit = 0
			   bet.IsPending = true
			} else {
				bet.Profit = gameresult.Allprofit
				bet.IsPending = false
			}
			bet.Kind = gameresult.Kind
			bet.Sn = gameresult.Sn
			
			

			/*  待完成
				需增加客户端输入参数的检查。
			*/

			if bet.Profit >= 0 {
				bet.Win = true
			} else {
				bet.Win = false
			}
			bet.Balance = 0 // 待议
			//var bet_id = 0 ;
			beego.Info("Inser Bet")
			if id, beterr := o.Insert(&bet); beterr != nil {
				beego.Info("bet Inserterr:", err)
				anyError = true
			} else {
				for j := 0; j < len(params.Pick); j++ {
					//var b = params.Pick[j].Stake
					var detail models.BetDetail
					detail.Bet = &bet
					detail.Icon =  params.Pick[j].Icon
					detail.Stake = params.Pick[j].Stake


					if detail_id, detail_err := o.Insert(&detail); detail_err != nil {
						beego.Info("bet_detail Inserterr:", err)
						anyError = true
					} else {
						beego.Info("bet_detail id: ", detail_id)
						//gameresult.Betid = utils.ToStr(id)
					}
				}

				beego.Info("gameresult: ", gameresult.Pick)
				beego.Info("bet id: ", id)
				gameresult.Betid = utils.ToStr(id)
			}
		}	

		if anyError==false {
			var updateBalance = gameresult.Allprofit 
			var updateProfit = gameresult.Allprofit 
			if isPending == true {
				updateBalance = gameresult.Total *-1
				updateProfit = 0 
			}

			if res, err := o.Raw("UPDATE deposit SET balance = balance+ ? , profit = profit + ?  WHERE user_id = ?", updateBalance, updateProfit, user.Id).Exec(); err != nil {
				anyError = true
				beego.Info(" deposit update err:", err)
			} else {
				if value, err := utils.Float64Add(gameresult.Allprofit,balance, 8); err == nil {
					gameresult.Balance = value
				}else {
					anyError = true
				}
				//gameresult.Balance = balance + gameresult.Allprofit
				num, err := res.RowsAffected()
				beego.Info("deposit table row affected nums: ", num)
				if num == 1 {

				} else {
					beego.Info("deposit update err2:", err)
					anyError = true
				}
			}

		}

		gameresult.Shash = ""  //不回传shash了
		if b, err := json.Marshal(gameresult); err == nil {
			ResultJsonStr = string(b)
		} else {
			beego.Info("json Marshal err:", err)
			anyError = true
		}

	} else {
		anyError = true
		beego.Info(err)
	}

	//事务处理过程结束

	if anyError {
		o.Rollback()
		beego.Info("err", err)
		return "", "", err
	} else {
		err = o.Commit()		
		return Lucky, ResultJsonStr, nil
	}

}


func SaveBetDetail(user *models.User, params BetParams) (error) {

	return nil
}