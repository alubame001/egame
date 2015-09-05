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

package utils

import (
	"time"
)

func GetNextSn()(string){

	now := time.Now()
	//beego.Info(now)
	d, _ := time.ParseDuration("1m")
	now = now.Add(d)
	//beego.Info(now)

    year,mon,day := now.Date()
    hour,min,_ := now.Clock()
	var m= 0
	switch mon {
		case time.December :
			m = 12			
		case time.November :
			m = 11	
		case time.October :
			m = 10			
		case time.September :
			m = 9	
		case time.August :
			m = 8			
		case time.July :
			m = 7	
		case time.June :
			m = 6			
		case time.May :
			m = 5
		case time.April :
			m = 4			
		case time.March :
			m = 3	
		case time.February :
			m = 2			
		case time.January :
			m = 1

	}
    
    var n =  ((year-2000)*100000000)+ (m*1000000)+(day*10000)+(hour*100)+ min
   // var nextSn = utils.ToStr(n)
    var nextSn = ToStr(n)
	return nextSn
}

