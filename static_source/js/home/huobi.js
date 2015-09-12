function huobi_btc() {
	//setTimeout(function() {
		//http://api.huobi.com/staticmarket/detail_btc_json.js
		//$.when( $.ajax("test.aspx") ).then(function(data, textStatus, jqXHR){
     	//	alert( jqXHR.status ); // alerts 200
		//});
		$.when($.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "http://api.huobi.com/staticmarket/detail_btc_json.js",//要访问的后台地址
            //data: "pageIndex=" + pageIndex,//要发送的数据
            complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定
                //var data = msg.table;
                //{"total":37753864.5451,"p_high":1555.77,"p_open":1530.52,"p_new":1542.06,"p_low":1524.9,"top_buy":[{"amount":2.5,"level":1,"price":1542.18,"accu":2.5},{"amount":1.7,"level":1,"price":1542.17,"accu":4.2},
                var i = 1
                $("#huobi_btc_new").text(Math.round(msg.p_new*i)/i)
                $("#huobi_btc_high").text(Math.round(msg.p_high*i)/i)
                $("#huobi_btc_open").text(Math.round(msg.p_open*i)/i)
                $("#huobi_btc_low").text(Math.round(msg.p_low*i)/i)
                var raise = ((Math.round(msg.p_new*i)/i) - (Math.round(msg.p_open*i)/i))  / (Math.round(msg.p_new*i)/i)        
                console.log("raise",raise)        //(msg.p_new-msg.p_open)/msg.p_new *100
                raise = raise *100
                r =Math.round(raise*100)/100
                console.log(r)
                //$("p").css("color","red");
                if (r>0){
                	$('.BtcPercent').css("color","red");
                } 
                if (r<0){
                	$('.BtcPercent').css("color","green");
                } 

                $("#huobi_btc_raise").text(r)
                $("#huobi_btc_total").text(msg.total)

                $('.RMBBTC').priceFormat({
                	 prefix: '',
                   // centsSeparator: '.',
                    thousandsSeparator: ',',
                    centsLimit: 0
                });



            
                
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
function huobi_ltc() {
	//setTimeout(function() {
		//http://api.huobi.com/staticmarket/detail_btc_json.js
		//$.when( $.ajax("test.aspx") ).then(function(data, textStatus, jqXHR){
     	//	alert( jqXHR.status ); // alerts 200
		//});
		$.when($.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "http://api.huobi.com/staticmarket/detail_ltc_json.js",//要访问的后台地址
            //data: "pageIndex=" + pageIndex,//要发送的数据
            complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定
                var i = 100 
                //console.log(msg.p_new div 1)
                //console.log(msg.p_open div 1)
                var j = msg.p_low 
                console.log("j",j)
                $("#huobi_ltc_new").text(Math.round(msg.p_new*i)/i)
                $("#huobi_ltc_high").text(Math.round(msg.p_high*i)/i)
                $("#huobi_ltc_open").text(Math.round(msg.p_open*i)/i)
                $("#huobi_ltc_low").text(Math.round(msg.p_low*i)/i)
                var raise = ((Math.round(msg.p_new*i)/i) - (Math.round(msg.p_open*i)/i))  / (Math.round(msg.p_new*i)/i)        
                //console.log(raise)        //(msg.p_new-msg.p_open)/msg.p_new *i0
                raise = raise *100
                r =Math.round(raise*100)/100 
                console.log(r)
                //$("p").css("color","red");
                if (r>0){
                	$('.LtcPercent').css("color","red");
                } 
                if (r<0){
                	$('.LtcPercent').css("color","green");
                } 

                $("#huobi_ltc_raise").text(r)
                $("#huobi_ltc_total").text(msg.total)
/*
                $('.RMBLTC').priceFormat({
                	 prefix: '',
                    centsSeparator: '.',
                    thousandsSeparator: ',',
                    //centsLimit: 1
                });
*/


                //  sleep(5000)
              
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



//huobi_btc();
//huobi_ltc();