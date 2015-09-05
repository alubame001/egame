WebApp.Router.map(function() {
     this.resource('home', function() {   
    
    });
});

WebApp.HomeController = Ember.Controller.extend({
  isLogin:true,
  isSignup:false,
  isForegetPassword:false, 

       needs: 'application',



});
/*

WebApp.AnalystuidView = WebApp.SinglePageView.extend({ templateName:'analystpage' }); 
WebApp.AnalystuidController = WebApp.SinglePageController.extend({
    searchEnabled:false,
  paginationEnabled:false,
});

*/