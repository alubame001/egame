

WebApp.ChartView = Ember.View.extend({
    templateName: 'chart_pie',
    didInsertElement: function() {
    },

});

WebApp.ChartController = Ember.Controller.extend({
 init: function() {
  
    var data = this.content.content;
   console.log( data.length);
   var m =[];
        for(var i=0;i<data.length;i++){
            console.log( data[i]._data);
           m.push(data[i]._data);
        }
        this.set('chartdata', m);    
        
  },
  game : '123'
/*
  ,chartdata: [
    {
        "label": "Equity",
        "value": 12935781.176999997
    },
    {
        "label": "Real Assets",
        "value": 10475849.276172025
    },
    {
        "label": "Fixed Income",
        "value": 8231078.16438347
    },
    {
        "label": "Cash & Cash Equivalent",
        "value": 5403418.115000006
    },
    {
        "label": "Hedge Fund",
        "value": 1621341.246006786
    },
    {
        "label": "Private Equity",
        "value": 1574677.59
    }
  ],
  */
/*
 content: [
    {
        "label": "Equity",
        "value": 12935781.176999997
    },
    {
        "label": "Real Assets",
        "value": 10475849.276172025
    },
    {
        "label": "Fixed Income",
        "value": 8231078.16438347
    },
    {
        "label": "Cash & Cash Equivalent",
        "value": 5403418.115000006
    },
    {
        "label": "Hedge Fund",
        "value": 1621341.246006786
    },
    {
        "label": "Private Equity",
        "value": 1574677.59
    }
  ],
  */ 
 });

/*
WebApp.ChartRoute = Ember.Route.extend({

    model: function(params) {
      return Ember.RSVP.hash({ // 这里 model 对象包含多种子对象 
         chart: this.store.find('chart'),  
           
      });
    }, setupController: function (controller, model) {
    controller.set('content', model.chart);   
  }  
});
*/
/*
WebApp.ApplicationController = Ember.Controller.extend({
       isLogin:true,
      isSignup:false,
      isForegetPassword:false, 
  // Used for horizontal bar chart, vertical bar chart, and pie chart
  content: [
    {
        "label": "Equity",
        "value": 12935781.176999997
    },
    {
        "label": "Real Assets",
        "value": 10475849.276172025
    },
    {
        "label": "Fixed Income",
        "value": 8231078.16438347
    },
    {
        "label": "Cash & Cash Equivalent",
        "value": 5403418.115000006
    },
    {
        "label": "Hedge Fund",
        "value": 1621341.246006786
    },
    {
        "label": "Private Equity",
        "value": 1574677.59
    }
  ],
  
  // Used only for scatter chart
  scatterContent: [
    {
        "group": "Energy",
        "xValue": 0.017440569068138557,
        "yValue": 0.029481600786463634
    },
    {
        "group": "Energy",
        "xValue": -0.28908275497440244,
        "yValue": -0.08083803288141521
    },
    {
        "group": "Industrial Metals",
        "xValue": 0.14072400896070691,
        "yValue": 0.04008348814566197
    },
    {
        "group": "Municipal Bonds",
        "xValue": -0.2712097037294005,
        "yValue": -0.11227088454416446
    },
    {
        "group": "Precious Metals",
        "xValue": -0.1728403500715051,
        "yValue": -0.04917117591842082
    },
    {
        "group": "Real Estate",
        "xValue": -0.06466537726032852,
        "yValue": -0.03309230484591455
    }
  ],
  
  // Used only for time series chart
  timeSeriesBarContent: [
    {
      time: d3.time.format('%Y-%m-%d').parse("2013-05-15"),
      label: "Financial analytics software",
      value: 49668,
      type: "money"
    }, {
      time: d3.time.format('%Y-%m-%d').parse("2013-06-15"),
      label: "Financial analytics software",
      value: 68344,
      type: "money"
    }, {
      time: d3.time.format('%Y-%m-%d').parse("2013-07-16"),
      label: "Financial analytics software",
      value: 60654,
      type: "money"
    }, {
      time: d3.time.format('%Y-%m-%d').parse("2013-08-16"),
      label: "Financial analytics software",
      value: 48240,
      type: "money"
    }, {
      time: d3.time.format('%Y-%m-%d').parse("2013-09-16"),
      label: "Financial analytics software",
      value: 62074,
      type: "money"
    }
  ],
  
  // Used only for time series chart
  timeSeriesLineContent: [
    {
      time: d3.time.format('%Y-%m-%d').parse("2013-05-15"),
      label: "Software & Programming",
      value: 17326,
      type: "money"
    }, {
      time: d3.time.format('%Y-%m-%d').parse("2013-05-15"),
      label: "Telecommunication",
      value: 4515,
      type: "money"
    }, {
      time: d3.time.format('%Y-%m-%d').parse("2013-06-15"),
      label: "Software & Programming",
      value: 15326,
      type: "money"
    }, {
      time: d3.time.format('%Y-%m-%d').parse("2013-06-15"),
      label: "Telecommunication",
      value: 1515,
      type: "money"
    }, {
      time: d3.time.format('%Y-%m-%d').parse("2013-07-16"),
      label: "Software & Programming",
      value: 14326,
      type: "money"
    }, {
      time: d3.time.format('%Y-%m-%d').parse("2013-07-16"),
      label: "Telecommunication",
      value: 8518,
      type: "money"
    }, {
      time: d3.time.format('%Y-%m-%d').parse("2013-08-16"),
      label: "Software & Programming",
      value: 42301,
      type: "money"
    }, {
      time: d3.time.format('%Y-%m-%d').parse("2013-08-16"),
      label: "Telecommunication",
      value: 90191,
      type: "money"
    }, {
      time: d3.time.format('%Y-%m-%d').parse("2013-09-16"),
      label: "Software & Programming",
      value: 57326,
      type: "money"
    }, {
      time: d3.time.format('%Y-%m-%d').parse("2013-09-16"),
      label: "Telecommunication",
      value: 39544,
      type: "money"
    }
  ]
});



*/
