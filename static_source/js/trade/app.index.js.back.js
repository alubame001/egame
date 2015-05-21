

WebApp.IndexController = Ember.Controller.extend({
  isLogin:true,
  isSignup:false,
  isForegetPassword:false, 

       needs: 'application',



});
WebApp.IndexView = Ember.View.extend({

    didInsertElement: function() {
       console.log('IndexView');
        //$("#topBar").slide({ mainCell:"ul",autoPlay:true,effect:"topLoop" });
        $("#txtMarqueeTop").slide({mainCell:".bd ul",autoPlay:false,effect:"topMarquee",vis:5,interTime:50,trigger:"click"});
        $("#sideMenu").slide({ titCell:".hd", targetCell:".bd",effect:"slideDown",trigger:"click" });
       //  $(".nav").slide({ type:"menu",  titCell:".m", targetCell:".sub", effect:"slideDown", delayTime:300, triggerTime:100,returnDefault:true  });
        $(".focusBox").slide({ titCell:".num li", mainCell:".pic",effect:"fold", autoPlay:true,trigger:"click",
        //下面startFun代码用于控制文字上下切换
            startFun:function(i){
                $(".focusBox .txt li").eq(i).animate({"bottom":0}).siblings().animate({"bottom":-36});
            }
        });
        
        $(".adSlide").slide({ titCell:".hd ul", mainCell:".bd ul",autoPlay:true,effect:"top",autoPage:true });
        $(".picScroll").slide({ mainCell:"ul",autoPlay:true,effect:"left", vis:5, scroll:2, autoPage:true, pnLoop:false });
        
        $(".slideTxtBox").slide();
       
        $(".friendLink").slide({ mainCell:"ul",autoPlay:true,effect:"leftMarquee",interTime:50,vis:6  });
        $(".sideBox").slide({titCell:"h3", targetCell:"ul",defaultIndex:1,effect:"slideDown",delayTime:300,returnDefault:true});

    	//$(".sideBox").addClass('magictime swashIn');
    	//$(".focusBox").addClass('magictime swashIn');
    	//$(".ember-application").addClass('magictime swashOut');
    	//$(".ember-application").addClass('magictime swashIn');



    	$(".webbutton").click(function () {
		  	$('#login').addClass('magictime swashIn');

		  	//console.log('hover');
		});
    }
});



WebApp.IndexRoute = Ember.Route.extend({

  model: function() {
  	  //console.log(this.setPage);
  		// this.controllerFor('loginip').set('selectedPage', 2)
    return Ember.RSVP.hash({

       //indice :this.store.find('indice'),     
       //person :this.store.find('person'),     
       login :{errorTime:0},
      // chart: this.store.find('chart'),  
    });
  },
  aftermodel :{

  },
  //利用 setupController 来手动指明路由提供给其他控制器的 model
  /*
  setupController: function (controller, model) {
    controller.set('content', model);    
     var m =[];
        for(var i=0;i<model.chart.content.length;i++){
         // console.log(model.chart.content[i]._data);
           m.push(model.chart.content[i]._data);
        }
        controller.set('chartdata', m);     
  },
*/
  actions:{
        moveForward:function(params){
            this.set('selectedPage', params.id);
        },
        moveBackward:function(params){   
            this.set('selectedPage', params.id);
        },
         goToPage:function(params){        

            this.set('selectedPage', params);
        },

        buyFilter:function(params){        
           //  this.store.find('loginip',{type:'buy'});
             this.set('filterParam', true);
              this.set('model.loginip', this.store.find('loginip',{isDone:this.get('filterParam')}) )
        },


        setLoginState:function(params){        
          console.log(params);
           if (params=='1'){
             this.controller.set('isLogin', true);
             this.controller.set('isSignup', false);     
             this.controller.set('isForegetPassword', false);                   
            }
           if (params=='2'){
             this.controller.set('isLogin', false);
             this.controller.set('isSignup', true);     
             this.controller.set('isForegetPassword', false);  
                            
            }
           if (params=='3'){
             this.controller.set('isLogin', false);
             this.controller.set('isSignup', false);     
             this.controller.set('isForegetPassword', true);                   
            }

        },       


    },   
  
});

