 var attr = DS.attr,
    belongsTo = DS.belongsTo,
    hasMany = DS.hasMany;

WebApp.ApplicationAdapter = DS.RESTAdapter.extend({
       // url: 'http://localhost:8080',
        namespace: 'api',
  headers: {
    'API_KEY': 'secret key',
    'Access-Control-Allow-Origin': '*',
    //'Access-Control-Request-Method': 'http://localhost',    
  }
});



WebApp.ApplicationStore = DS.Store.extend({
    revision: 12,
   
    /*
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
*/
adapter: DS.RESTAdapter,
 
});

/*
WebApp.Loginip = DS.Model.extend({
    username: attr('string'),
    isDone : attr('boolean'),
});

WebApp.Person = DS.Model.extend({
    username: attr('string')
});




WebApp.Currency = DS.Model.extend({   

    tradeAvailable: attr('string'),
    kind : attr('string'),
    symbol: attr('string'),
    cid: attr('string'),        
    eid:attr('string'),
    buyPrice: attr('string'),  
    sellPrice: attr('string'),
    change: attr('string')
});


WebApp.Information = DS.Model.extend({  
  
    createtime: attr('string'),  
    title: attr('string'), 
    docu: attr('string'),

});






WebApp.WelcomeGuide = DS.Model.extend({
   
    username: 'test',
  
});



WebApp.Category = DS.Model.extend({
   
    categoryName: attr('string'),

});

WebApp.Category.FIXTURES = [
    {id:1,categoryName:'大宗商品'},
    {id:2,categoryName:'股指'},
    {id:3,categoryName:'外汇'},

];





WebApp.Orderhistory = DS.Model.extend({ 
    createDate: attr('string'),
    name: attr('string'),
    type: attr('string'),        
    price:attr('string'),
    amount: attr('string'),  
    dealAmount: attr('string'),
    avgPrice: attr('string'),
    symbol: attr('string'),   
});

WebApp.Delegation = DS.Model.extend({ 
    createDate: attr('string'),
    name: attr('string'),
    type: attr('string'),        
    price:attr('string'),
    amount: attr('string'),  
    leftAmount: attr('string'),
    symbol: attr('string'),
    _id : attr('string'), 
});  


WebApp.Holditem = DS.Model.extend({ 
    createDate: attr('string'),
    name: attr('string'),
    type: attr('string'),        
    price:attr('string'),
    amount: attr('string'),  
    symbol: attr('string'),  
    profit: attr('float'),  
    kind: attr('string'),   

   
});  





WebApp.Marketmaker.FIXTURES = [
    {id:1,createDate:'2014-11-01',kind:'currency',symbol:'mmcf',eid:'Market-maker Currency Fund', cid:'做市商外汇基金', closedAmount:'12300',closedProfit:'300.023',holdAmount:'100',holdProfit:'1.09',perShareValue:'1.1301',   amount:'1000',netValue:'1130.1',holditems:[3,4,5,6,7]},

    {id:2,createDate:'2014-12-05',kind:'index',symbol:'mmif',eid:'Market-maker Global Index Fund', cid:'做市商全球指数基金', closedAmount:'300',closedProfit:'0.223',holdAmount:'9000',holdProfit:'10.19',perShareValue:'1.28023',   amount:'1000',netValue:'1280.23',holditems:[1,2]},

];



WebApp.Mmkind = DS.Model.extend({ 
    createDate: attr('string'),
    eid: attr('string'),
    cid: attr('string'),
    kind: attr('string'),
    symbol: attr('string'),
    closedAmount: attr('string'),
    closedProfit: attr('string'),
    holdAmount: attr('string'),
    holdProfit: attr('string'),    
    perShareValue: attr('string'),        
    netValue:attr('string'),
    amount: attr('string'),     

    holditems: hasMany('holditem', {async: true}),  
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



WebApp.Mp = WebApp.Base.extend({
    match_price: attr('string'), 
    match_quality: attr('string'),    

});



WebApp.Indice = DS.Model.extend({  
    kind : attr('string'),    
    symbol: attr('string'), 
    eid:attr('string'),
    cid: attr('string'),   
    price : attr('string'),       
    sell_price: attr('string'),
    buy_price: attr('string'),
    change : attr('string'),
    change_rate : attr('string'),  
    spread : attr('string'),  
    spread_unit : attr('string'),  
    float_position : attr('string'),  
    upddatetime : attr('string'),  
});

WebApp.Analyst = DS.Model.extend({ 
    uid : attr('string'),
    cid: attr('string'),    
    create_date: attr('string'),    
    kind: attr('string'),
    total_profit_percent: attr('string'),
    monthly_profit_percent: attr('string'),
    total_profit: attr('string'),
    monthly_profit: attr('string'),   
    winning_percent: attr('string'),
    avg_profit: attr('string'),
    follow_person: attr('string'),
    

});

WebApp.Price = DS.Model.extend({  
    kind : attr('string'),    
    symbol: attr('string'), 
    eid:attr('string'),
    cid: attr('string'),   
    price : attr('string'),       
    sell_price: attr('string'),
    buy_price: attr('string'),
    change : attr('string'),
    change_rate : attr('string'),  
    spread : attr('string'),  
    spread_unit : attr('string'),  
    float_position : attr('string'),  
    upddatetime : attr('string'),  
});
*/
WebApp.Base = DS.Model.extend({
    uid : attr('string'),
    cid: attr('string'), 
    eid: attr('string'), 
    type : attr('string'),    
    create_date: attr('string'),    
    kind: attr('string'),   
}) 



WebApp.Contract = WebApp.Base.extend({
    last_price:attr(''), 
    sell_price:attr(''), 
    buy_price:attr(''), 
    today_amount: attr('string'), 
    total_amount: attr('string'),      
    end_date: attr('string'),      
});
WebApp.Game = DS.Model.extend({  
    user : attr('string'),    
    type: attr('string'), 
    timestamp:attr('string'),
    type: attr('string'),   
    content : attr('string'), 
});
WebApp.Trade = WebApp.Base.extend({
    price: attr('string'), 
    quality: attr('string'),    

});
