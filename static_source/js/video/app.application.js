
WebApp.Router.map(function() {
  this.route('catchall', {path: '/*wildcard'});
 
});



WebApp.ApplicationRoute = Ember.Route.extend({
  
    actions: {
      error: function (params) {
        console.log(params)   
        
      }
    },

    afterModel: function(model, transition) {


        var ajax = $.ajax;
        $.extend({
            ajax: function(url, options) {
                if (typeof url === 'object') {
                    options = url;
                    url = undefined;
                }
                options = options || {};
                url = options.url;
                var xsrftoken = $('meta[name=_xsrf]').attr('content');
                var headers = options.headers || {};
                var domain = document.domain.replace(/\./ig, '\\.');
                if (!/^(http:|https:).*/.test(url) || eval('/^(http:|https:)\\/\\/(.+\\.)*' + domain + '.*/').test(url)) {
                    headers = $.extend(headers, {'X-Xsrftoken':xsrftoken});
                }
                options.headers = headers;
                
                return ajax(url, options);
            }
        });
     }     


});




WebApp.ApplicationController = Ember.Controller.extend({
  
  isLogin:true,
  isSignup:false,
  isForegetPassword:false, 

});


WebApp.ApplicationView = Ember.View.extend({
    didInsertElement: function() {

    
        
    }
});


/*
WebApp.ApplicationView = Ember.View.extend({
  didInsertElement: function() {
    //AjaxNotice.initializeGlobalEvents();
    fixLang();
  }
});
*/


//WebApp.ApplicationView = WebApp.SinglePageView.extend({templateName:"application"}); 