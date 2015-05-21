/*
WebApp.ApplicationAdapter = DS.RESTAdapter.extend({
       // url: 'http://localhost:8080',
        namespace: 'api',
  headers: {
    'API_KEY': 'secret key',
    'Access-Control-Allow-Origin': '*',
    //'Access-Control-Request-Method': 'http://localhost',    
  }
});
*/
  //  WebApp.ApplicationAdapter= DS.FixtureAdapter;


WebApp.ApplicationStore = DS.Store.extend({
    revision: 12,
   // adapter: 'DS.RESTAdapter',
    
    adapter: DS.FixtureAdapter.extend({
        queryFixtures: function(fixtures, query, type) {
            console.log(type);
             console.log(query);   
            return fixtures.filter(function(item) {
                for(prop in query) {
                    if( item[prop] != query[prop]) {
                        return false;
                    }
                }
                return true;
            });
        }
    }),


 
});


/*
WebApp.Store = DS.Store.extend({
    revision: 12,
   // 
   
    adapter: DS.RESTAdapter.extend({
        //url: 'http://0.0.0.0:8080',
        namespace: 'api',
        headers: {

            'API_KEY': 'secret key',
          //  "Access-Control-Allow-Origin": "*",
          //  "Access-Control-Allow-Headers": "X-Requested-With"
          //  'Access-Control-Request-Method': '*',    
        }

    })
});
*/

WebApp.Loginip = DS.Model.extend({
    username: DS.attr('string'),
    isDone : DS.attr('boolean'),
});

WebApp.Person = DS.Model.extend({
    username: DS.attr('string')
});



WebApp.Trade = DS.Model.extend({  
  
//    {id:1,change:0,buyPrice:120,sellPrice:0,tradeAvailable:1,kind:"forex",eid:"USDJPY",symbol:"USDJPY",cid:"美金/日元"}
    change: DS.attr('string'), 
    buyPrice: DS.attr('string'),  
    sellPrice: DS.attr('string'),
    tradeAvailable: DS.attr('string'),
    kind : DS.attr('string'),
    eid:DS.attr('string'),

    symbol: DS.attr('string'),
    cid: DS.attr('string'),        

  


});

WebApp.Indice = DS.Model.extend({  
  
//    {id:1,change:0,buyPrice:120,sellPrice:0,tradeAvailable:1,kind:"forex",eid:"USDJPY",symbol:"USDJPY",cid:"美金/日元"}
    change: DS.attr('string'), 
    buyPrice: DS.attr('string'),  
    sellPrice: DS.attr('string'),
    tradeAvailable: DS.attr('string'),
    kind : DS.attr('string'),
    eid:DS.attr('string'),

    symbol: DS.attr('string'),
    cid: DS.attr('string'),      
});

WebApp.Currency = DS.Model.extend({   

    tradeAvailable: DS.attr('string'),
    kind : DS.attr('string'),
    symbol: DS.attr('string'),
    cid: DS.attr('string'),        
    eid:DS.attr('string'),
    buyPrice: DS.attr('string'),  
    sellPrice: DS.attr('string'),
    change: DS.attr('string')
});


WebApp.Information = DS.Model.extend({  
  
//    {id:1,change:0,buyPrice:120,sellPrice:0,tradeAvailable:1,kind:"forex",eid:"USDJPY",symbol:"USDJPY",cid:"美金/日元"}
    createtime: DS.attr('string'),  
    title: DS.attr('string'), 
    docu: DS.attr('string'),

});






WebApp.WelcomeGuide = DS.Model.extend({
   
    username: 'test',
  
});

WebApp.WelcomeGuide.FIXTURES = [
  

];


WebApp.Category = DS.Model.extend({
    id: DS.attr('string'),
    categoryName: DS.attr('string'),

});
//WebApp.Category.adapter = Ember.FixtureAdapter.create();
WebApp.Category.FIXTURES = [
    {id:1,categoryName:'大宗商品'},
    {id:2,categoryName:'股指'},
    {id:3,categoryName:'外汇'},

];



WebApp.Loginip.FIXTURES = [
    {id:1,username:'201.123.31.22',isDone:true},
    {id:2,username:'231.22.11.99',isDone:true},
    {id:3,username:'231.22.11.99',isDone:true},
    {id:4,username:'211.123.31.21',isDone:true},
    {id:5,username:'211.223.31.22',isDone:false},
    {id:6,username:'211.123.31.22',isDone:false},
    {id:7,username:'211.123.31.22',isDone:false}
];


WebApp.Person.FIXTURES = [
    {id:1,username:'dave one'},
    {id:2,username:'dave two'},
    {id:3,username:'dave three'},
    {id:4,username:'dave four'},
    {id:5,username:'dave five'},
    {id:6,username:'dave six1232'},
    {id:7,username:'dave seven'}
];



WebApp.Trade.FIXTURES = [
    {id:1,change:0,buyPrice:120,sellPrice:0,tradeAvailable:1,kind:"currency",eid:"USDJPY",symbol:"USDJPY",cid:"美金/日元"},
    {id:2,change:0,buyPrice:380,sellPrice:0,tradeAvailable:1,kind:"currency",eid:"BTCUSD",symbol:"BTCUSD",cid:"比特币/美元"},
    {id:3,change:0,buyPrice:380,sellPrice:0,tradeAvailable:1,kind:"currency",eid:"EURUSD",symbol:"EURUSD",cid:"欧元/美元"},

    {id:4,change:0,buyPrice:380,sellPrice:0,tradeAvailable:1,kind:"agricultural",eid:"COTTON",symbol:"COTTON",cid:"棉花"},
    {id:5,change:0,buyPrice:120,sellPrice:0,tradeAvailable:1,kind:"index",eid:"NASDAQ",symbol:"NASDAQ",cid:"纳斯达克"},
    {id:6,change:0,buyPrice:380,sellPrice:0,tradeAvailable:1,kind:"index",eid:"FTSE",symbol:"FTSE",cid:"英国富时"},



];
WebApp.Indice.FIXTURES = [
    {id:1,change:0,buyPrice:120,sellPrice:0,tradeAvailable:1,kind:"currency",eid:"USDJPY",symbol:"USDJPY",cid:"美金/日元"},
    {id:2,change:0,buyPrice:380,sellPrice:0,tradeAvailable:1,kind:"currency",eid:"BTCUSD",symbol:"BTCUSD",cid:"比特币/美元"},
    {id:3,change:0,buyPrice:380,sellPrice:0,tradeAvailable:1,kind:"currency",eid:"EURUSD",symbol:"EURUSD",cid:"欧元/美元"},
    {id:4,change:0,buyPrice:380,sellPrice:0,tradeAvailable:1,kind:"agricultural",eid:"COTTON",symbol:"COTTON",cid:"棉花"},
    {id:5,change:0,buyPrice:120,sellPrice:0,tradeAvailable:1,kind:"index",eid:"NASDAQ",symbol:"NASDAQ",cid:"纳斯达克"},
    {id:6,change:0,buyPrice:380,sellPrice:0,tradeAvailable:1,kind:"index",eid:"FTSE",symbol:"FTSE",cid:"英国富时"},




];

WebApp.Orderhistory = DS.Model.extend({ 
    createDate: DS.attr('string'),
    name: DS.attr('string'),
    type: DS.attr('string'),        
    price:DS.attr('string'),
    amount: DS.attr('string'),  
    dealAmount: DS.attr('string'),
    avgPrice: DS.attr('string'),
    symbol: DS.attr('string'),   
});
WebApp.Orderhistory.FIXTURES = [
    {id:1,createDate:'2014-12-09 10:12:24', name:'BTC20141130', type:'sell', price:'1200', amount:'1020', dealAmount:'9000', avgPrice:'1201.01',symbol:'BTCUSD'},
    {id:2,createDate:'2014-12-09 11:13:24', name:'BTC20141230', type:'buy', price:'1300', amount:'900', dealAmount:'9100', avgPrice:'1203.01',symbol:'BTCUSD'},
    {id:3,createDate:'2014-12-09 11:15:24', name:'BTC20141130', type:'sell', price:'1200', amount:'10000', dealAmount:'9000', avgPrice:'1201.01',symbol:'BTCUSD'},
    {id:4,createDate:'2014-12-09 11:16:24', name:'BTC20141230', type:'buy', price:'1300', amount:'9900', dealAmount:'9100', avgPrice:'1203.01',symbol:'BTCUSD'},
    {id:5,createDate:'2014-12-09 11:17:24', name:'BTC20141130', type:'buy', price:'1200', amount:'10000', dealAmount:'9000', avgPrice:'1201.01',symbol:'BTCUSD'},
    {id:6,createDate:'2014-12-09 11:18:12', name:'BTC20141230', type:'sell', price:'1300', amount:'9900', dealAmount:'9100', avgPrice:'1203.01',symbol:'BTCUSD'},   
    {id:7,createDate:'2014-12-12 11:50:25', name:'BTC20141230', type:'sell', price:'1300', amount:'9900', dealAmount:'9100', avgPrice:'1203.01',symbol:'EURUSD'},
];

WebApp.Delegation = DS.Model.extend({ 
    createDate: DS.attr('string'),
    name: DS.attr('string'),
    type: DS.attr('string'),        
    price:DS.attr('string'),
    amount: DS.attr('string'),  
    leftAmount: DS.attr('string'),
    symbol: DS.attr('string'),
    _id : DS.attr('string'), 
});  
WebApp.Delegation.FIXTURES = [
    {id:1,createDate:'2014-12-09 06:02:24', name:'BTC20141130', type:'sell', price:'1100', amount:'10020', leftAmount:'9000',symbol:'BTCUSD',_id:'1k2cdsfdsf21g'},
    {id:2,createDate:'2014-12-09 11:13:24', name:'BTC20141230', type:'buy', price:'1200', amount:'900', leftAmount:'9100',symbol:'BTCUSD',_id:'sdafbadf123bjjd'},
    {id:3,createDate:'2014-12-09 11:14:24', name:'BTC20141130', type:'buy', price:'1300', amount:'1000', leftAmount:'9000',symbol:'BTCUSD',_id:'hz1123dsfdsf21g'},
    {id:4,createDate:'2014-12-09 12:11:24', name:'BTC20141230', type:'buy', price:'1320', amount:'99000', leftAmount:'9100',symbol:'BTCUSD',_id:'adfdsfdsf21g'},
    {id:5,createDate:'2014-12-09 12:12:24', name:'BTC20141130', type:'sell', price:'1210', amount:'10000', leftAmount:'9000',symbol:'BTCUSD',_id:'dfafh213f'},
    {id:6,createDate:'2014-12-09 13:16:24', name:'BTC20141230', type:'sell', price:'1310', amount:'99000', leftAmount:'9100',symbol:'BTCUSD',_id:'888cdsfdsf21g'}, 

    {id:7,createDate:'2014-12-09 11:13:24', name:'USDJPY20141230', type:'buy', price:'12.2331', amount:'300', leftAmount:'9100',symbol:'USDJPY',_id:'1ddshhfdsf21g'},
    {id:8,createDate:'2014-12-09 11:14:24', name:'USDJPY20141130', type:'buy', price:'13.1231', amount:'200', leftAmount:'9000',symbol:'USDJPY',_id:'dsfafg123123'},
    {id:9,createDate:'2014-12-09 12:11:24', name:'USDJPY20141230', type:'buy', price:'13.1231', amount:'1000', leftAmount:'9100',symbol:'USDJPY',_id:'sdfgr8898'},
    {id:10,createDate:'2014-12-09 12:12:24', name:'USDJPY20141130', type:'sell', price:'12.1321', amount:'1000', leftAmount:'9000',symbol:'USDJPY',_id:'gadfdfade123'},
    {id:11,createDate:'2014-12-09 13:16:24', name:'USDJPY20141230', type:'sell', price:'13.103', amount:'9000', leftAmount:'9100',symbol:'USDJPY',_id:'dsfdsfadf1gg'}, 

];


WebApp.Holditem = DS.Model.extend({ 
    createDate: DS.attr('string'),
    name: DS.attr('string'),
    type: DS.attr('string'),        
    price:DS.attr('string'),
    amount: DS.attr('string'),  
    symbol: DS.attr('string'),  
    profit: DS.attr('float'),  
    kind: DS.attr('string'),   

    //marketmaker: DS.belongsTo('marketmaker')
});  

WebApp.Holditem.FIXTURES = [
    {id:1,createDate:'2014-12-09 06:01:24', name:'BTC20141130', type:'sell',profit:-300.12345678 ,price:'1100', amount:'10000',kind:'currency',symbol:'BTCUSD'},
    {id:2,createDate:'2014-12-09 16:02:27', name:'BTC20141130', type:'sell',profit:3300, price:'1100', amount:'200',kind:'currency',symbol:'BTCUSD'},
    {id:3,createDate:'2014-12-29 06:02:24', name:'BTC20141130', type:'buy',profit:40.11, price:'1100', amount:'400',kind:'currency',symbol:'BTCUSD'},
    {id:4,createDate:'2015-12-19 06:02:27', name:'BTC20141130', type:'buy',profit:-3.11, price:'1300', amount:'400',kind:'currency',symbol:'BTCUSD'},
    {id:5,createDate:'2015-01-19 06:04:27', name:'BTC20141130', type:'buy',profit:2000.01, price:'600', amount:'20000',kind:'currency',symbol:'USDJPY'},
    {id:6,createDate:'2015-01-19 16:03:27', name:'USDJPY20141230', type:'buy',profit:-3.11, price:'1300', amount:'400',kind:'currency',symbol:'USDJPY'},
    {id:7,createDate:'2015-01-19 16:12:27', name:'USDJPY20141230', type:'buy',profit:2000.01, price:'600', amount:'20000',kind:'currency',symbol:'USDJPY'},


];

WebApp.Hold = DS.Model.extend({ 
    nick: DS.attr('string'), 
    profit: DS.attr('string'), 
    createDate: DS.attr('string'),
    name: DS.attr('string'),
    type: DS.attr('string'),        
    price:DS.attr('string'),
    amount: DS.attr('string'),  
    leftAmount: DS.attr('string'),
    kind : DS.attr('string'),   
    symbol: DS.attr('string'),        
    holditems: DS.hasMany('holditem', {async: true}),  
    holdTotalProfit: function() {
        var amount = new Big(0);
          // var profit = new Big(0);
        this.get('holditems').forEach(function(item)
        {

            if (item._data.profit != undefined){
              //  console.log(item._data.profit);
                      profit =  item._data.profit               
                    amount = amount.plus(profit);
            }

        });
        return amount;
    }.property('holditems.@each.profit'),  

    holdTotalCount: function() {
        var amount = new Big(0);
          // var profit = new Big(0);
        this.get('holditems').forEach(function(item)
        {

            if (item._data.profit != undefined){              
                    amount = amount.plus(1);
            }

        });
        return amount;
    }.property('holditems.@each.profit'),  
    

    holdTotalAmount: function() {
        var amount = new Big(0);
          // var profit = new Big(0);
        this.get('holditems').forEach(function(item)
        {

            if (item._data.amount != undefined){              
                    amount = amount.plus(item._data.amount);
            }

        });
        return amount;
    }.property('holditems.@each.amount'),  

  
});  
//类型持仓金额(￥)平均成本持仓盈亏(฿)平仓价格平仓数量(฿)
WebApp.Hold.FIXTURES = [
    {id:1,nick:'andylin',profit:'20.01',createDate:'2014-12-09 06:02:24', name:'BTC20141130', type:'sell', price:'1100', amount:'100200', leftAmount:'9000',kind:'currency',symbol:'BTCUSD',holditems:[1,2]},
    {id:2,nick:'Wen',profit:'-99.35',createDate:'2014-12-09 11:13:24', name:'BTC20141230', type:'buy', price:'1200', amount:'800', leftAmount:'9100',kind:'currency',symbol:'BTCUSD',holditems:[3,4]},
    {id:3,nick:'Wen',profit:'-99.35',createDate:'2014-12-09 11:13:24', name:'USDJPY20141230', type:'buy', price:'1200', amount:'800', leftAmount:'9100',kind:'currency',symbol:'USDJPY',holditems:[5]},
    {id:4,nick:'神一样的队友',profit:'-99.35',createDate:'2014-12-09 11:13:24', name:'USDJPY20141230', type:'buy', price:'1200', amount:'800', leftAmount:'9100',kind:'currency',symbol:'USDJPY',holditems:[6,7]},

];


WebApp.Marketmaker = DS.Model.extend({ 
    createDate: DS.attr('string'),
    eid: DS.attr('string'),
    cid: DS.attr('string'),
    kind: DS.attr('string'),
    symbol: DS.attr('string'),
    closedAmount: DS.attr('string'),
    closedProfit: DS.attr('string'),
    holdAmount: DS.attr('string'),
    holdProfit: DS.attr('string'),    
    perShareValue: DS.attr('string'),        
    netValue:DS.attr('string'),
    amount: DS.attr('string'),     
    holds: DS.hasMany('hold', {async: true}),  

    holditems: DS.hasMany('holditem', {async: true}),  
    holdTotalProfit: function() {
        var amount = new Big(0);
          // var profit = new Big(0);
        this.get('holditems').forEach(function(item)
        {

            if (item._data.profit != undefined){
                //console.log(item._data.profit);
                      profit =  item._data.profit               
                    amount = amount.plus(profit);
            }

        });
        return amount.times(-1);
    }.property('holditems.@each.profit'),  

    holdTotalCount: function() {
        var amount = new Big(0);
          // var profit = new Big(0);
        this.get('holditems').forEach(function(item)
        {

            if (item._data.profit != undefined){              
                    amount = amount.plus(1);
            }

        });
        return amount;
    }.property('holditems.@each.profit'),  
    

    holdTotalAmount: function() {
        var amount = new Big(0);
          // var profit = new Big(0);
        this.get('holditems').forEach(function(item)
        {

            if (item._data.amount != undefined){              
                    amount = amount.plus(item._data.amount);
            }

        });
        return amount;
    }.property('holditems.@each.amount'),  
    testProfit: function() {
        var amount = new Big(0);
        var profit = new Big(0);
        this.get('holds').forEach(function(item)
        {
            if (item._data.holditems!= undefined){
                console.log(item._data.holditems.length);
            }
            /*
            if (item._data.holdTotalProfit != undefined){
                console.log(item._data.holdTotalProfit);
                      profit =  item._data.holdTotalProfit               
                    amount = amount.plus(profit);
            }
            */
        });
        return amount.times(-1);
    }.property('holds.@each.holdTotalProfit'),  
});


WebApp.Marketmaker.FIXTURES = [
    {id:1,createDate:'2014-11-01',kind:'currency',symbol:'mmcf',eid:'Market-maker Currency Fund', cid:'做市商外汇基金', closedAmount:'12300',closedProfit:'300.023',holdAmount:'100',holdProfit:'1.09',perShareValue:'1.1301',   amount:'1000',netValue:'1130.1',holds:[1,2,3,4,5,6,7],holditems:[1,2,3,4,5,6,7]},

    {id:2,createDate:'2014-12-05',kind:'index',symbol:'mmif',eid:'Market-maker Global Index Fund', cid:'做市商全球指数基金', closedAmount:'300',closedProfit:'0.223',holdAmount:'9000',holdProfit:'10.19',perShareValue:'1.28023',   amount:'1000',netValue:'1280.23',holds:[],holditems:[]},

];



WebApp.Mmkind = DS.Model.extend({ 
    createDate: DS.attr('string'),
    eid: DS.attr('string'),
    cid: DS.attr('string'),
    kind: DS.attr('string'),
    symbol: DS.attr('string'),
    closedAmount: DS.attr('string'),
    closedProfit: DS.attr('string'),
    holdAmount: DS.attr('string'),
    holdProfit: DS.attr('string'),    
    perShareValue: DS.attr('string'),        
    netValue:DS.attr('string'),
    amount: DS.attr('string'),     

    holditems: DS.hasMany('holditem', {async: true}),  
    holdTotalProfit: function() {
        var amount = new Big(0);
          // var profit = new Big(0);
        this.get('holditems').forEach(function(item)
        {

            if (item._data.profit != undefined){
                console.log(item._data.profit);
                      profit =  item._data.profit               
                    amount = amount.plus(profit);
            }

        });
        return amount.times(-1);
    }.property('holditems.@each.profit'),  
    holdTotalAmount: function() {
        var amount = new Big(0);
          // var profit = new Big(0);
        this.get('holditems').forEach(function(item)
        {

            if (item._data.amount != undefined){              
                    amount = amount.plus(item._data.amount);
            }

        });
        return amount;
    }.property('holditems.@each.amount'),  
    

});


WebApp.Information.FIXTURES = [
    {id:0,createtime:'2014-02-29',title:'test',docu:'test~~~~~~~~~~~'},    
    {id:1,createtime:'2014-03-21',title:'交易程序更新',docu:'交易程序更新~~~~~~~~~~~'},
    {id:2,createtime:'2014-03-22',title:'页面程序更新',docu:'页面程序更新~~~~~~~~~~~'},
    {id:3,createtime:'2014-03-23',title:'test',docu:'test~~~~~~~~~~~'},
    {id:4,createtime:'2014-03-24',title:'交易程序更新',docu:'交易程序更新~~~~~~~~~~~'},
    {id:5,createtime:'2014-03-25',title:'页面程序更新',docu:'页面程序更新~~~~~~~~~~~'},
    {id:6,createtime:'2014-03-26',title:'test',docu:'test~~~~~~~~~~~'},
    {id:7,createtime:'2014-03-27',title:'交易程序更新',docu:'交易程序更新~~~~~~~~~~~'},
    {id:8,createtime:'2014-03-28',title:'页面程序更新',docu:'页面程序更新~~~~~~~~~~~'},
    {id:9,createtime:'2014-03-29',title:'test',docu:'test~~~~~~~~~~~'},    
    {id:10,createtime:'2014-03-26',title:'test',docu:'test~~~~~~~~~~~'},
    {id:11,createtime:'2014-03-27',title:'交易程序更新',docu:'交易程序更新~~~~~~~~~~~'},
    {id:12,createtime:'2014-03-28',title:'页面程序更新',docu:'页面程序更新~~~~~~~~~~~'},


];

WebApp.Depositdetail = DS.Model.extend({ 
    createTime:DS.attr('string'),
    amount: DS.attr('number'),
    type: DS.attr('string'),
    addition: DS.attr('string'),        

}); 



WebApp.Depositdetail.FIXTURES = [
    {id:0,createTime:'2014-02-29',amount:19,type:'finished',addition:'12dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'},    
    {id:1,createTime:'2014-03-21',amount:22,type:'finished',addition:'45ddddddddddddddddddddddddddddddddddddddddddddddddddd6'},
    {id:2,createTime:'2014-03-22',amount:31,type:'finished',addition:'789dddddddddddddddddddddddddddddd'},
    {id:3,createTime:'2014-03-23',amount:12,type:'finished',addition:'3dddsssssssssssssssssssssssssssssssssssdddddd3'},
    {id:4,createTime:'2014-03-24',amount:22,type:'finished',addition:'3dddddddddd3'},
    {id:5,createTime:'2014-03-25',amount:33,type:'finished',addition:'2ddddddddddddddddddsssssssssdddddddddddddddddddddddddd2'},
    {id:6,createTime:'2014-03-26',amount:44,type:'finished',addition:'dddddddddddddddd44'},
    {id:7,createTime:'2014-03-27',amount:12,type:'finished',addition:'44'},
    {id:8,createTime:'2014-03-28',amount:2,type:'finished',addition:'444444444444444444ddddddddddddd44444444444444444444444444'},
    {id:9,createTime:'2014-03-29',amount:1,type:'finished',addition:'ddddddddddddd'},    
    {id:10,createTime:'2014-03-26',amount:2,type:'finished',addition:'ddddddddddddddddddddddddddddddddddddddd'},
    {id:11,createTime:'2014-03-27',amount:12,type:'finished',addition:'aaaaaaaaaaaaaaccccccccccccccccccccccccccccccc'},
    {id:12,createTime:'2014-03-28',amount:1,type:'finished',addition:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},


];

WebApp.Deposit = DS.Model.extend({ 
    userId: DS.attr('string'),
    wallet: DS.attr('string'),
    balance: DS.attr('number'),        
    freeze:DS.attr('number'),
    createTime: DS.attr('string'),   
}); 



WebApp.Deposit.FIXTURES = [
    {id:0,userId:'testaccount',wallet:'1fXXXXXXXXXXXXXXXXXXXXXXXXX',balance:20.01,freeze:10.01,createTime:'2014-02-29'},    



];

/*
WebApp.Trader.url = "/trade";

WebApp.Trade.adapter = Ember.RESTAdapter.create();
WebAppTradeAdapter = Ember.RESTAdapter.extend({
  ajaxSettings: function(url, method) {
    return {
      url: 'http://localhost:8080/trade/forex',
      type: method,
      headers: {
        "authentication": "xxx-yyy"
      },
      dataType: "json"
    };
  }
});
*/
//WebApp.ApplicationSerializer = DS.ActiveModelSerializer;

var pushData = {
  trade: [
    {id:7,change:0,buyPrice:380,sellPrice:0,tradeAvailable:1,kind:"currency",eid:"FTSE2",symbol:"FTSE2",cid:"英国富时2"}
  ]
}
//console.log(this.store)
//WebApp.ApplicationStore.push(pushData);

WebApp.Chart = DS.Model.extend({  

    
    label: DS.attr('string'),
    value: DS.attr('float'),  
   
});
WebApp.Chart.FIXTURES = [
    {id:0,label:'BTCUSD',value:1320.8},
    {id:1,label:'USDJPY',value:502.98}    
];



WebApp.Dailyreport = DS.Model.extend({  

    kind : DS.attr('string'),
    time: DS.attr('string'),
    value : DS.attr('float'),   
    customerCount:DS.attr('float'),  

    holditemAmount:DS.attr('float'),
    holdProfit:DS.attr('float'),       

    closeditemAmount:DS.attr('float'),    
    closedProfit:DS.attr('float'),   
    totalProfit:DS.attr('float'),     


});
WebApp.Dailyreport.FIXTURES = [
    {id:0,kind:'currency',time:'2015-01-01',value:1.0041,customerCount:3,holditemAmount:30000,holdProfit:1320.8,closeditemAmount:30000,closedProfit:1320.8,totalProfit:2641.6},
    {id:1,kind:'currency',time:'2015-01-02',value:1.0180,customerCount:5,holditemAmount:20000,holdProfit:-20,closeditemAmount:30000,closedProfit:1320.8,totalProfit:1299.2},
    {id:2,kind:'currency',time:'2015-01-03',value:1.02,customerCount:3,holditemAmount:20000,holdProfit:2.8,closeditemAmount:30000,closedProfit:1320.8,totalProfit:1323.6},
    {id:3,kind:'currency',time:'2015-01-04',value:1.0331,customerCount:5,holditemAmount:30010,holdProfit:-2,closeditemAmount:30000,closedProfit:1320.8,totalProfit:1318.8},
    {id:4,kind:'currency',time:'2015-01-05',value:1.1283,customerCount:3,holditemAmount:30000,holdProfit:20.8,closeditemAmount:30000,closedProfit:1320.8,totalProfit:1117.8},
    {id:5,kind:'currency',time:'2015-01-06',value:1.2833,customerCount:5,holditemAmount:30000,holdProfit:-203,closeditemAmount:30000,closedProfit:1320.8,totalProfit:1641.6},
    {id:6,kind:'currency',time:'2015-01-07',value:1.2830,customerCount:3,holditemAmount:30000,holdProfit:320.8,closeditemAmount:30000,closedProfit:1320.8,totalProfit:2641.6},
    {id:7,kind:'currency',time:'2015-01-08',value:1.2831,customerCount:5,holditemAmount:30000,holdProfit:20,closeditemAmount:30000,closedProfit:1320.8,totalProfit:2641.6},
    {id:8,kind:'index',time:'2015-01-01',value:1.2041,customerCount:3,holditemAmount:30000,holdProfit:1320.8,closeditemAmount:30000,closedProfit:1320.8,totalProfit:2641.6},
    {id:9,kind:'index',time:'2015-01-02',value:1.2180,customerCount:5,holditemAmount:20000,holdProfit:-20,closeditemAmount:30000,closedProfit:1320.8,totalProfit:1299.2},
    {id:10,kind:'index',time:'2015-01-03',value:1.021,customerCount:3,holditemAmount:20000,holdProfit:2.8,closeditemAmount:30000,closedProfit:1320.8,totalProfit:1323.6},
    {id:11,kind:'index',time:'2015-01-04',value:1.031,customerCount:5,holditemAmount:30010,holdProfit:-2,closeditemAmount:30000,closedProfit:1320.8,totalProfit:1318.8},
    {id:12,kind:'index',time:'2015-01-05',value:1.183,customerCount:3,holditemAmount:30000,holdProfit:20.8,closeditemAmount:30000,closedProfit:1320.8,totalProfit:1117.8},
    {id:13,kind:'index',time:'2015-01-06',value:1.1233,customerCount:5,holditemAmount:30000,holdProfit:-203,closeditemAmount:30000,closedProfit:1320.8,totalProfit:1641.6},
    {id:14,kind:'index',time:'2015-01-07',value:1.0830,customerCount:3,holditemAmount:30000,holdProfit:320.8,closeditemAmount:30000,closedProfit:1320.8,totalProfit:2641.6},
    {id:15,kind:'index',time:'2015-01-08',value:1.1831,customerCount:5,holditemAmount:30000,holdProfit:20,closeditemAmount:30000,closedProfit:1320.8,totalProfit:2641.6},




];

WebApp.Dailyreportdetail = DS.Model.extend({  
    kind : DS.attr('string'),
    time: DS.attr('string'),
    nick:DS.attr('string'),  
    holditemCount:DS.attr('float'),  
    holditemAmout:DS.attr('float'),  

    profit:DS.attr('float'),     
});

WebApp.Dailyreportdetail.FIXTURES = [
    {id:0,kind:'currency',time:'2014-12-20',nick:'andylin',holditemCount:10,holditemAmout:1000,profit:1320.8},
    {id:1,kind:'currency',time:'2014-12-21',nick:'andylin',holditemCount:20,holditemAmout:1000,profit:-20},
    {id:2,kind:'currency',time:'2014-12-22',nick:'andylin',holditemCount:30,holditemAmout:1000,profit:2.8},
    {id:3,kind:'currency',time:'2014-12-23',nick:'andylin',holditemCount:210,holditemAmout:1000,profit:-2},
    {id:4,kind:'currency',time:'2014-12-24',nick:'andylin',holditemCount:20,holditemAmout:1000,profit:20.8},
    {id:5,kind:'currency',time:'2014-12-25',nick:'andylin',holditemCount:20,holditemAmout:1000,profit:-203},
    {id:6,kind:'currency',time:'2014-12-26',nick:'andylin',holditemCount:20,holditemAmout:1000,profit:20.8},
    {id:7,kind:'currency',time:'2014-12-27',nick:'andylin',holditemCount:20,holditemAmout:1000,profit:-203},
];

















WebApp.Customer = DS.Model.extend({ 
    createDate: DS.attr('string'),
    eid: DS.attr('string'),
    cid: DS.attr('string'),
    kind: DS.attr('string'),
    symbol: DS.attr('string'),
    closedAmount: DS.attr('string'),
    closedProfit: DS.attr('string'),
    holdAmount: DS.attr('string'),
    holdProfit: DS.attr('string'),    
    perShareValue: DS.attr('string'),        
    netValue:DS.attr('string'),
    amount: DS.attr('string'),     


    holditems: DS.hasMany('holditem', {async: true}),  
    holdTotalProfit: function() {
        var amount = new Big(0);
          // var profit = new Big(0);
        this.get('holditems').forEach(function(item)
        {

            if (item._data.profit != undefined){
                //console.log(item._data.profit);
                      profit =  item._data.profit               
                    amount = amount.plus(profit);
            }

        });
        return amount.times(-1);
    }.property('holditems.@each.profit'),  

    holdTotalCount: function() {
        var amount = new Big(0);
          // var profit = new Big(0);
        this.get('holditems').forEach(function(item)
        {

            if (item._data.profit != undefined){              
                    amount = amount.plus(1);
            }

        });
        return amount;
    }.property('holditems.@each.profit'),  
    

    holdTotalAmount: function() {
        var amount = new Big(0);
          // var profit = new Big(0);
        this.get('holditems').forEach(function(item)
        {

            if (item._data.amount != undefined){              
                    amount = amount.plus(item._data.amount);
            }

        });
        return amount;
    }.property('holditems.@each.amount'),  

});


WebApp.Customer.FIXTURES = [
    {id:1,createDate:'2014-11-01',kind:'currency',symbol:'mmcf',eid:'Currency', cid:'外汇', closedAmount:'12300',closedProfit:'300.023',holdAmount:'100',holdProfit:'1.09',perShareValue:'1.1301',   amount:'1000',netValue:'1130.1',holditems:[1,2,3,4,5,6,7]},

    {id:2,createDate:'2014-12-05',kind:'index',symbol:'mmif',eid:'Global Index', cid:'全球指数', closedAmount:'300',closedProfit:'0.223',holdAmount:'9000',holdProfit:'10.19',perShareValue:'1.28023',   amount:'1000',netValue:'1280.23',holditems:[]},

];