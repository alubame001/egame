

WebApp.ApplicationAdapter = DS.RESTAdapter.extend({
       // url: 'http://localhost:8080',
        namespace: 'api',
  headers: {
    'API_KEY': 'secret key',
    'Access-Control-Allow-Origin': '*',
    //'Access-Control-Request-Method': 'http://localhost',    
  }
});

 

var attr = DS.attr,
    belongsTo = DS.belongsTo,
    hasMany = DS.hasMany;

WebApp.ApplicationStore = DS.Store.extend({
    revision: 12,
   
    
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

    adapter: DS.RESTAdapter,
 
});



WebApp.Video = DS.Model.extend({     
    symbol: attr('string'),   
    sn: attr('string'),   
    cid: attr('string'),   
    nr: attr('number'),   
    nr0: attr('boolean'),   
    nr1: attr('boolean'),   
    nr2: attr('boolean'),   
    nr3: attr('boolean'),   
    nr4: attr('boolean'),   
    nr5: attr('boolean'),   
    nr6: attr('boolean'),   
    nr7: attr('boolean'),   
    nr8: attr('boolean'),   
    nr9: attr('boolean'),   
    dxd: attr('boolean'), 
    dxx: attr('boolean'), 
    dsd: attr('boolean'), 
    dss: attr('boolean'), 
    zbz: attr('boolean'), 
    zbb: attr('boolean'), 
    ywy: attr('boolean'), 
    yww: attr('boolean'), 
    jyj: attr('boolean'), 
    jyy: attr('boolean'), 
    created : attr('string'),  
});

WebApp.Static = DS.Model.extend({    
    items: hasMany('video', {async: true}),  
    totalAmount: function() {
        var amount = new Big(0);
          // var profit = new Big(0);
        this.get('items').forEach(function(item)
        {

            if (item._data.sn != undefined){  
                    amount = amount.plus(1);
            }

        });
        return amount;
    }.property('items.@each.sn'),
});

/*

WebApp.Analy = DS.Model.extend({ 
    symbol: attr('string'),   

    videos: hasMany('video', {async: true}),  


  
    

    
    number_result_amount: function() {
        var amount =  0;
      //  var amount = new Big(0);
          // var profit = new Big(0);
        this.get('videos').forEach(function(item)
        {
            console.log("1")

            if (item._data.number_result0 != true){              
                    amount ++;
            }

        });
        return amount;
    }.property('videos.@each.number_result')
    

   
});



WebApp.Video.FIXTURES = [
    {id:1,symbol:"lol",sn:"1",number_result:2,number_result0:false,number_result1:false,number_result2:true,number_result3:false,number_result4:false,number_result5:false,number_result6:false,number_result7:false,number_result8:false,number_result9:false,
    dx_result_d:false,dx_result_x:true,
    ds_result_d:false,ds_result_s:true,
    zb_result_z:false,zb_result_b:true,
    yw_result_y:false,yw_result_w:true,
    jy_result_j:false,jy_result_y:true,
    created:'2015-08-01'},
    {id:2,symbol:"lol",sn:"2",number_result:3,number_result0:false,number_result1:false,number_result2:false,number_result3:true,number_result4:false,number_result5:false,number_result6:false,number_result7:false,number_result8:false,number_result9:false,
    dx_result_d:false,dx_result_x:true,
    ds_result_d:false,ds_result_s:true,
    zb_result_z:false,zb_result_b:true,
    yw_result_y:false,yw_result_w:true,
    jy_result_j:false,jy_result_y:true,
    created:'2015-08-01'},
    {id:3,symbol:"lol",sn:"3",number_result:0,number_result0:true,number_result1:false,number_result2:false,number_result3:false,number_result4:false,number_result5:false,number_result6:false,number_result7:false,number_result8:false,number_result9:false,
    dx_result_d:false,dx_result_x:true,
    ds_result_d:false,ds_result_s:true,
    zb_result_z:false,zb_result_b:true,
    yw_result_y:false,yw_result_w:true,
    jy_result_j:false,jy_result_y:true,
    created:'2015-08-01'},
       

];

WebApp.Analy.FIXTURES = [
    {id:1,symbol:"lol",videos:[1,2,3]},
];
*/
/*
    dx_result_d: attr('boolean'), 
    dx_result_x: attr('boolean'), 
    ds_result_d: attr('boolean'), 
    ds_result_s: attr('boolean'), 
    zb_result_z: attr('boolean'), 
    zb_result_b: attr('boolean'), 
    yw_result_y: attr('boolean'), 
    yw_result_w: attr('boolean'), 
    jy_result_j: attr('boolean'), 
    jy_result_y: attr('boolean'), 
    created : attr('string'), 
    */