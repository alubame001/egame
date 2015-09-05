WebApp.IfEqualComponent = Ember.Component.extend({
  isEqual: function() {
    return this.get('param1') === this.get('param2');
  }.property('param1', 'param2')
});
/*
Handlebars.registerHelper('compare', function(var1, var2) {
  console.log(var1)
  console.log(var2)
  if (var1 == var2)  {
    return var1 
  }
});
*/
/*
{{#compare age 20}}
{{else}}
{{/compare}}
*/
/*
 var myTemplate = Handlebars.compile($("#table-template").html());

     $('#tableList').html(myTemplate(model.lol));  
Handlebars.registerHelper("compare",function(v1,v2,options){
   console.log("v1",v1)
   console.log("v2",v2)
   if(v1==v2){
   //满足添加继续执行

     return options.fn(this);
   }else{
     //不满足条件执行{{else}}部分
     return options.inverse(this);
   }
});
*/

Handlebars.registerHelper("formatPhoneNumber", function(phoneNumber) {
  phoneNumber = phoneNumber.toString();
  return "(" + phoneNumber.substr(0,3) + ") " + 
    phoneNumber.substr(3,3) + "-" + 
    phoneNumber.substr(6,4);
});

Handlebars.registerHelper('ifCond', function(v1,options) {
  console.log(v1)
  if(v1 == 1) {
    return options.fn(this);
  }
  return options.inverse(this);
});


var AjaxNotice = {

  initializeGlobalEvents: function () {
    $(document).ajaxStart(function () {
      AjaxNotice.addAjaxNotice();
    });

    $(document).ajaxStop(function () {
      AjaxNotice.removeAjaxNotice();
    });
  },

  addAjaxNotice: function () {
    AjaxNotice.slideInNotice();
  },

  removeAjaxNotice: function () {
    AjaxNotice.slideOutNotice();
  },

  slideInNotice: function () {
    $('body').append(AjaxNotice.getHtml());
  },

  slideOutNotice: function () {
   $("#ajax_notice").remove();
  },

  getHtml: function () {
    console.log('getHtml');
    fixLang();
//    return '<div id="ajax_notice" class="ajax_spinner"> Working...</div>'
  }
}

function fixLang() {    
  console.log("fixLang");
    var oLangArea = document.getElementsByTagName("l");     
    console.log('lang length:'+oLangArea.length); 
    for(var i=0;i<oLangArea.length;i++){
           if  ( typeof oLangArea[i] != "undefined" ) {
            var s1 ='"';
            var s2 =oLangArea[i].innerHTML;

          var  result = "";
          for(var j=0;j<s2.length;j++){    
              if (s2[j] != '"'){    
                 result = result+ s2[j]   
                // console.log(result);
              } 
          }
          //console.log('s2 :'+s2.substring(0)); 
          oLangArea[i].innerHTML =  eval('"'+result +'"');

            /*
                 //if  ( typeof oLangArea[i].getAttribute("id") !=  "undefined") {
                 if  ( oLangArea[i].getAttribute("id")) {
                  var s =oLangArea[i].getAttribute("id");        
                 var j= (oLangArea[i].getAttribute("id")).substring(1);
                     
                //oLangArea[i].innerHTML = eval('message.'+lang+'['+j+']');
                
                    if (lang == "chs"){
                      oLangArea[i].innerHTML = eval('message_chs['+j+']');
                    }
                    if (lang == "en"){
                      oLangArea[i].innerHTML = eval('message_en['+j+']');
                    }                   
                    
                    
              }
              */
        }
    }
   
}   
