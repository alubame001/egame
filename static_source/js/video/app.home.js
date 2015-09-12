WebApp.Router.map(function() {
     this.resource('home', function() {   
    
    });
});

WebApp.HomeController = Ember.Controller.extend({
       needs: 'application',



});
WebApp.HomeView = Ember.View.extend({
    didInsertElement: function() {
    	nav();
    	huobi_btc();
        huobi_ltc();   
    /*
    	nav();
    	 ostb_int();
    	 TGAdsShow.init();

        huobi_btc();
        huobi_ltc();   
    */
    }
 })	


