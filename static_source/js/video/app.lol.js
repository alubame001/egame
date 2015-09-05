WebApp.Router.map(function() {
     this.resource('lolgame', function() {   
       // this.route('uid', {path: 'uid/:uid'},function() {              
        // }); 

                   
    });
});
WebApp.LolController = WebApp.SinglePageController.extend({
  dataName :'video',
  itemsPerPage:20,
  searchEnabled:false,
  paginationEnabled:true, 

});

WebApp.LolgameView = WebApp.IndexView.extend({
 templateName:'index'
});


WebApp.LolgameRoute = WebApp.IndexRoute.extend({
  });

WebApp.LolgameController =WebApp.IndexController.extend({
 }); 