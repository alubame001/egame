  /**
	* 
	* by dily
	* (c) copyright 2014 - 2035
	* All Rights Reserved. 
	* LocalStoreage.setLocalStoreage()
    */

module LocalStoreage {
 	export function  setLocalStoreage(key,value : string):void{
        var storage = window.localStorage;
        var v = storage.getItem(key);​
        //console.log(v)
        if (v =="" || v==null){ 
            var new_value = '['+value+']'
            storage.setItem(key,new_value);//用localStorage保存转化好的的字符串
        }else{
           
            var obj =JSON.parse(v)
            var newitem = JSON.parse(value)

            var i = obj.unshift(newitem)  //添加到数组的开头
            if (i>20){                  
               obj.pop()  //移除数组最後一个
            }           
            var newstr =    JSON.stringify(obj)  
            storage.setItem(key,newstr);
        }
       
    }  

	
}