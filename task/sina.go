package task

import (
	//"github.com/alubame/go-sina-finance"
	"github.com/astaxie/beego"
	//"github.com/astaxie/beego/orm"
	//"github.com/alubame001/egame/setting"
	//_ "github.com/lib/pq"
	//	"strconv"
	//"strings"
)

/*
var searchSymbol = []string{
	"000001.ss",
	"EURUSD=X",
	"BTCUSD=X",
	"RUBUSD=X",
	"399005.sz",

	"^FTSE",
	"^FCHI",
	"399006.sz",
	"399001.sz",
	"^IXIC",
	"^HSI"}
*/
//var sSymbol = []string{}
//var o = orm.NewOrm()

func init() {
	/*
		o.Using("default")
		var list orm.ParamsList
		var err error
		var num int64
		num, err = o.Raw("SELECT symbol as result from price").ValuesFlat(&list)
		if err == nil && num > 0 {
			for key := range list {
				var a = list[key].(string)
				sSymbol = append(sSymbol, a)
			}
		}
	*/
}

func sina() error {
	beego.Trace("sina")
	//var eventItem = newEvent(2, "", "")
	//	beego.Info(eventItem)
	//publish <- eventItem //透过longpolling发送资料

	//var output = []string{"Cid", "empty1", "Price", "Change", "Percent", "Count", "Amount", "empty2", "empty3", "empty4"}

	//out, err := sina_finance.GetStockInfo(sSymbol, output)
	/*
		//out, err := finance.GetStockInfo([]string{"BTCUSD=X", "EURUSD=X", "JPYUSD=X"}, output)
		if out != nil && err == nil {
			//outputs map of stock symbols and their specified attributes given above
			for key := range out {
				var eventItem = newEvent(3, "", "")
				eventItem.S = key
				eventItem.P, _ = strconv.ParseFloat(out[key]["Price"], 64)
				eventItem.C, _ = strconv.ParseFloat(out[key]["Change"], 64)
				//mystr = out[key]["Percent"]
				//mystr = strings.Replace(mystr, "- -", "", -1)
				//mystr, _ = strconv.Unquote(mystr)
				eventItem.R = out[key]["Percent"]
				eventItem.R = eventItem.R + " %"
				if eventItem.P == 0 {
					break
				}
				var list orm.ParamsList

				_, err = o.Raw("Select  upd_indice2(?,?) as result", eventItem.S, eventItem.P).ValuesFlat(&list, "result")
				if list != nil && err == nil {
					//beego.Trace("update_indice: ", list[0].(string))
					var a = ""
					a = list[0].(string)
					a = strings.Replace(a, "(", "", -1)
					a = strings.Replace(a, ")", "", -1)
					var b = strings.Split(a, ",")
					//beego.Trace(" Split :", b)
					//beego.Trace(" Split 1  :", b[0])
					eventItem.P, err = strconv.ParseFloat(b[0], 64)
					eventItem.Id, err = strconv.ParseFloat(b[1], 64)
					if eventItem.P > 0 && err == nil && b != nil {
						publish <- eventItem //透过longpolling发送资料

						beego.Trace(key, a)
					} else {
						//beego.Trace(key, " not changed")
					}
				} else {
					//beego.Trace(eventItem, err)

				}

				//broadcastWebSocket(eventItem) 	//透过WebSocket发送资料

			}

		} else {

			//This may happen often if yahoo's server is under high volume
			beego.Trace("sina error:", err)


		}
	*/
	return nil
}

//var event = newEvent(2, "BTCUSD=X", out["BTCUSD=X"][finance.Last_Trade_Price_Only])
//broadcastWebSocket(event)
