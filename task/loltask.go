package task

import (
	"net/http"
	"io/ioutil"
	"encoding/json"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"time"
	"github.com/alubame001/egame/setting"
	//"github.com/alubame001/egame/routers/egame"
	//"github.com/gorilla/websocket"

)

type Lol struct {
	Data      []Detail  `json:"data"`    
}


type Detail struct {
    Id   string    `json:"id"`
    Date   string    `json:"date"`
    Name   string    `json:"name"`
    Result  float64   `json:"result"`
}
/*
冰霜女巫,0
德邦总管,1
德玛之力,2
寒冰射手,3
流浪法师,4
皮城女警,5
齐天大圣,6
无极剑圣,8
赏金猎人,7
雪人骑士,9
*/


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
func lolHttpGet() error{
	//beego.Info("lolHttpGet Start:",setting.LolRemoteAddress)
	resp, err := http.Get(setting.LolRemoteAddress)
	//resp, err := http.Get("http://175.9.97.210:8080/")
	if err != nil {
		 return err
	} 

	//defer resp.Body.Close()
	//i := strings.LastIndexAny(s, ",")
	//beego.Info(i)
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		 beego.Info(err)
		 return err
	} else {
		//先检查body中是否为空
		//检查body中是否有<pre 
		//检查body中是否有pre>



			//var detail LolData
		    
			//i := strings.LastIndexAny(s, ",")
			

		var lol Lol
		if err := json.Unmarshal([]byte(body), &lol); err == nil {
		//	beego.Info("lol.data:",lol.Data)
			for _, v := range lol.Data {
				SaveDetail(v)		
					//beego.Info(v.Id)
					//beego.Info(v.Date)
					//beego.Info(v.Result)
			}

		
		} else {
			beego.Info("Unmarshal Error:", err)
			//return
		}

			
	}

	
	return nil;
}
/*
 var d1 = []byte(wireteString);
 err2 := ioutil.WriteFile("./output2.txt", d1, 0666)  //写入文件(字节数组)
 check(err2)
*/

func SaveDetail(params Detail) (error) {
	
	//var ResultJsonStr = ""
	
	o := orm.NewOrm()
	var anyError = false
	var sqlstr=""
	var err = o.Begin()
/*
冰霜女巫,0
德邦总管,1
德玛之力,2
寒冰射手,3
流浪法师,4
皮城女警,5
齐天大圣,6
无极剑圣,8
赏金猎人,7
雪人骑士,9
*/	
	// 事务处理过程开始
	switch params.Result {
	case 0:
		sqlstr ="Insert Into video(nr0,symbol,sn,nr,created,dxd,dxx,dsd,dss,zbz,zbb,ywy,yww,jyj,jyy) values(true,?,?,?,?,false,true,false,true,false,true,true,false,false,true)"
	case 1:
		sqlstr ="Insert Into video(nr1,symbol,sn,nr,created,dxd,dxx,dsd,dss,zbz,zbb,ywy,yww,jyj,jyy) values(true,?,?,?,?,false,true,true,false,false,true,true,false,true,false)"
	case 2:
		sqlstr ="Insert Into video(nr2,symbol,sn,nr,created,dxd,dxx,dsd,dss,zbz,zbb,ywy,yww,jyj,jyy) values(true,?,?,?,?,false,true,false,true,false,false,false,true,true,false)"
	case 3:
		sqlstr ="Insert Into video(nr3,symbol,sn,nr,created,dxd,dxx,dsd,dss,zbz,zbb,ywy,yww,jyj,jyy) values(true,?,?,?,?,false,true,true,false,true,false,true,false,false,true)"
	case 4:
		sqlstr ="Insert Into video(nr4,symbol,sn,nr,created,dxd,dxx,dsd,dss,zbz,zbb,ywy,yww,jyj,jyy) values(true,?,?,?,?,false,true,false,true,true,false,true,false,false,true)"
	case 5:
		sqlstr ="Insert Into video(nr5,symbol,sn,nr,created,dxd,dxx,dsd,dss,zbz,zbb,ywy,yww,jyj,jyy) values(true,?,?,?,?,true,false,true,false,true,false,true,false,false,true)"
	case 6:
		sqlstr ="Insert Into video(nr6,symbol,sn,nr,created,dxd,dxx,dsd,dss,zbz,zbb,ywy,yww,jyj,jyy) values(true,?,?,?,?,true,false,false,true,true,false,true,false,true,false)"
	case 7:
		sqlstr ="Insert Into video(nr7,symbol,sn,nr,created,dxd,dxx,dsd,dss,zbz,zbb,ywy,yww,jyj,jyy) values(true,?,?,?,?,true,false,true,false,true,false,true,false,false,true)"
	case 8:
		sqlstr ="Insert Into video(nr8,symbol,sn,nr,created,dxd,dxx,dsd,dss,zbz,zbb,ywy,yww,jyj,jyy) values(true,?,?,?,?,true,false,false,true,false,true,true,false,true,false)"
	case 9:
		sqlstr ="Insert Into video(nr9,symbol,sn,nr,created,dxd,dxx,dsd,dss,zbz,zbb,ywy,yww,jyj,jyy) values(true,?,?,?,?,true,false,true,false,false,true,true,false,true,false)"



	}


	//if res, err := o.Raw("Insert Into video(symbol,sn,nr,created) values(?,?,?,?)", 
	var addNewRecord = false
	//beego.Info("sqlstr:", sqlstr)
	if res, err := o.Raw(sqlstr, 
		"lol",params.Id,params.Result,time.Now()).Exec(); err != nil {
		
		anyError = true
		
		//beego.Info("sqlstr:", sqlstr)
		//beego.Info("SaveDetail err:", err)
	} else {
		num, err := res.RowsAffected()
		beego.Info("video table row affected nums: ", num)
		beego.Info("params:", params)
		if err !=nil{
			beego.Info("SaveDetail err:", err)
		}
		if num == 1 {
			addNewRecord = true
           

			//var event = newEvent(2, "BTCUSD=X", out["BTCUSD=X"][finance.Last_Trade_Price_Only])
			//var event = newEvent(8, "Result", "")
			//beego.Info("event:",event)	
			//broadcastWebSocket(event)
		}		
		if num != 1 {
			//beego.Info("SaveDetail err:", err)
			anyError = true
		}
	}

	if anyError {
		err = o.Rollback()
		//beego.Info("SaveDetail err", err)
		return err
	} else {
		err = o.Commit()
		if addNewRecord {	
		   SaveJson("videos","lol","1")
           SaveJson("videos","lol","2")
           SaveJson("videos","lol","3")
           SaveJson("videos","lol","4")
        }  
		return  nil
	}

}


func SaveJson(category,symbol,amount string) (error) {	


	o := orm.NewOrm()
	o.Using("default")


	var limit = "100"
	switch amount {
		case "1":
			limit = "100"
		case "2":
			limit = "500"
		case "3":
			limit = "1000"
		case "4":
			limit = "5000"			
		default:
			limit = "100"
	}


	if true {
		var list orm.ParamsList
		var err error

		
		_, err = o.Raw("SELECT row_to_json(q)  as result FROM (select id,sn,nr from video where symbol= '"+symbol+"' order by sn desc limit "+limit+") q").ValuesFlat(&list, "result")


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

            var d1 = []byte(str3);
            err2 := ioutil.WriteFile("./json/"+symbol+"_"+amount+".json", d1, 0666)  //写入文件(字节数组)
        
            if err2 != nil {
              beego.Trace("err:", err2)
			  panic(err2)

            }
			/*

			js, err := simplejson.NewJson([]byte(str3))
			if err != nil {
				panic("json format error")
			}
			this.Data["json"] = js
			this.ServeJson(true)
			*/
		} else {
			beego.Trace("err:", err)
			panic(err)
		}
	}
	return nil;
}