/*
$.ajaxSetup({
	'beforeSend': function(xhr) {xhr.setRequestHeader("Access-Control-Allow-Origin","*")}
})
*/
function okcoin_btc() {
	//setTimeout(function() {
		//http://api.okcoin.com/staticmarket/detail_btc_json.js
		//$.when( $.ajax("test.aspx") ).then(function(data, textStatus, jqXHR){
     	//	alert( jqXHR.status ); // alerts 200
		//});
		$.when($.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "https://www.okcoin.cn/api/v1/ticker.do?symbol=btc_cny",//要访问的后台地址
            //data: "pageIndex=" + pageIndex,//要发送的数据
            complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定
                $("#okcoin_btc_new").text(Math.round(msg.ticker.last*10)/10)
                $("#okcoin_btc_high").text(Math.round(msg.ticker.high*10)/10)
               // $("#okcoin_btc_open").text(Math.round(msg.ticker.low*10)/10)
                $("#okcoin_btc_low").text(Math.round(msg.ticker.low*10)/10)
                /*
                var raise = ((Math.round(msg.p_new*10)/10) - (Math.round(msg.p_open*10)/10))  / (Math.round(msg.p_new*10)/10)        
                //console.log(raise)        //(msg.p_new-msg.p_open)/msg.p_new *100
                raise = raise *100
                r =Math.round(raise*100)/100 
                console.log(r)
                //$("p").css("color","red");
                if (r>0){
                	$('.Percent').css("color","red");
                } 
                if (r<0){
                	$('.Percent').css("color","green");
                } 

                $("#okcoin_btc_raise").text(r)
                $("#okcoin_btc_total").text(msg.total)
				*/
                $('.RMBBTC').priceFormat({
                	 prefix: '',
                   // centsSeparator: '.',
                    thousandsSeparator: ',',
                    centsLimit: 1
                });



                  sleep(1000)
                okcoin_ltc();
                /*
                $.each(msg, function(i, n){               	
                	console.log(n)
                });
				*/
			}
		}).then(function(data, textStatus, jqXHR){
		    // alert( jqXHR.status ); // alerts 200
		    //console.log("done")
		  
		}));
	//}, 1000)
}
function okcoin_ltc() {
	//setTimeout(function() {
		//http://api.okcoin.com/staticmarket/detail_btc_json.js
		//$.when( $.ajax("test.aspx") ).then(function(data, textStatus, jqXHR){
     	//	alert( jqXHR.status ); // alerts 200
		//});
		$.when($.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "https://www.okcoin.cn/api/v1/ticker.do?symbol=ltc_cny",//要访问的后台地址
            //data: "pageIndex=" + pageIndex,//要发送的数据
            complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定
                $("#okcoin_ltc_new").text(Math.round(msg.p_new*100)/100)
                $("#okcoin_ltc_high").text(Math.round(msg.p_high*100)/100)
               // $("#okcoin_ltc_open").text(Math.round(msg.p_open*100)/100)
                $("#okcoin_ltc_low").text(Math.round(msg.p_low*100)/100)
/*
                var raise = ((Math.round(msg.p_new*100)/100) - (Math.round(msg.p_open*100)/100))  / (Math.round(msg.p_new*100)/100)        

                raise = raise *100
                r =Math.round(raise*100)/100 
                console.log(r)

                if (r>0){
                	$('.Percent').css("color","red");
                } 
                if (r<0){
                	$('.Percent').css("color","green");
                } 

                $("#okcoin_ltc_raise").text(r)
                $("#okcoin_ltc_total").text(msg.total)
*/
                $('.RMBLTC').priceFormat({
                	 prefix: '',
                   // centsSeparator: '.',
                    thousandsSeparator: ',',
                    centsLimit: 2
                });



                  sleep(1000)
                okcoin_btc();
                /*
                $.each(msg, function(i, n){               	
                	console.log(n)
                });
				*/
			}
		}).then(function(data, textStatus, jqXHR){
		    // alert( jqXHR.status ); // alerts 200
		    //console.log("done")
		  
		}));
	//}, 1000)
}



function sleep(numberMillis) { 
   var now = new Date();
   var exitTime = now.getTime() + numberMillis;  
   while (true) { 
       now = new Date(); 
       if (now.getTime() > exitTime)    return;
    }
}
okcoin_btc();