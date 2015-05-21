var WebApp = Ember.Application.create();
/*
WebApp.Router.reopen({
  rootURL: '/egame/'
});
*/

WebApp.Welcome = Ember.Namespace.create();
WebApp.Stats = Ember.Namespace.create();
//WebApp.Info = Ember.Namespace.create();


Ember.Handlebars.helper('fromInt', function(value){
    return Number(Math.round(value) / 1e8).toFixed(8);
});

Ember.Handlebars.helper('toDate', function(datetime){
    return moment(datetime).format('YYYY-MM-DD');
});

Ember.Handlebars.helper('setting', function(path) {
    if (!path || path=="")
        return "";
    if (!window._gConfig)
        return null;

    var sections = path.split('\.');
    var result = window._gConfig;
    var key = sections.shift();
    while(result && key){
        result = result[key];
        key = sections.shift();
    }
    return result;
});

WebApp.WelcomeLoginController = Ember.Controller.extend({
    submitting: null,
    actions: {
        submit: function(event) {

            var self = this;
            /*
            var data = {
                login: this.get('login'),
                password: this.get('password'),
                captcha: this.get('captcha')
            };
            */
            var data = {
                UserName: this.get('login'),
                Password: this.get('password')                
            };


            self.set('submitting', 'disabled');
            var jqxhr = $.post('/login', data, function(data, textStatus, jqXHR) {
                try{                 
                        console.log(data)
                        $('#alert').removeClass('alert-info alert-danger');
                        $('#alert').text(data.message);
                    if (data.success == true){
                         $('#alert').addClass('alert-success');


                        window.location = data.redirect;
                    }else{
                       $('#alert').addClass('alert-info alert-danger'); 
                                          
                       $('#alert').fadeOut(100).fadeIn(2000);              
                       //$('.home_register').shake();
                       // $form.shake();
                        //alert(data.message);
                    }
                }catch(e){
                    alert(e.toString());
                }
            }, 'json');

            jqxhr.always(function(){
                self.set('submitting', null);
            });
            return false;
        }
    }
});
WebApp.WelcomeSignupController = Ember.Controller.extend({
    // init: function() {

    //     console.log('SignupController');
    //     console.log(this);
    // },
    model: { },
    isReferral: false,

    submitting : null,
    actions: {
        submit : function(){
            var self = this;
            self.set('submitting', 'disabled');

            var jqxhr = $.post('/welcome/signup', self.get('model'), function(data, textStatus, jqXHR){
                //console.log('signup return', arguments);
                try{
                    if (data.success == true){
                        window.location = data.link;
                    }else{
                        alert(data.message);
                    }
                }catch(e){
                    alert(e.toString());
                }
            }, 'json');

            jqxhr.fail(function(jqXHR, textStatus, errorThrown){
                alert("注册错误:" + errorThrown.message);
            });
            
            jqxhr.always(function(){
                self.set('submitting', null);
            });
        }
    }
});

WebApp.WelcomeReferralRoute = Ember.Route.extend({
    controllerName: "WelcomeSignup",
    templateName: "welcome/signup",
    viewName: "WelcomeSignup",

    setupController: function(controller, model){
        console.log('setupController', arguments);
        this._super(controller, model);
        controller.setProperties({
            'model.referId': model.referId,
            isReferral: true
        })
    },

    beforeModel: function() {
        //var x = this.transitionTo('welcome.signup', {referral: 123});
        //console.log('referral ', x);
    // },
    // renderTemplate: function() {
    //     this.render('welcome/signup');
    }
});

// WebApp.WelcomeSignupRoute = Ember.Route.extend({
//     model : function(){
//         console.log('signup',arguments);
//         return {
//             login: 'aaaaaaaaaaaaaa',
//             password: '1234567',
//             password2: '1234567',
//             nick: 'aaaa',
//             email: 'ssssss@gmail.com'
//         };
//     }
// });
WebApp.WelcomeLoginView = Ember.View.extend({
    didInsertElement: function() {
       // console.log('123');
        this.$('form').validate({
            rules: {
                login: {
                    required: true
                },
                password: {
                    required: true
                }
            }
        });
    },
    submit: function(event) {
        try {
            if (this.$('form').valid())
                this.controller.send('submit');
        } finally {
            event.preventDefault();
        }
    }
});
WebApp.WelcomeSignupView = Ember.View.extend({
    validateRules: {
        login: {
            required:true,
            minlength: 6,
            remote: '/welcome/signup/validate'
        },
        password: {
            required: true,
            minlength: 6
        },
        password2: {
            required: true,
            minlength: 6,
            equalTo: "#password"
        },
        nick: {
            required: true
        },
        email: {
            required: true,
            email: true
        }
    },
    didInsertElement: function() {
        $(".focusBox").slide({ titCell:".num li", mainCell:".pic",effect:"fold", autoPlay:true,trigger:"click",
            startFun:function(i){
                $(".focusBox .txt li").eq(i).animate({"bottom":0}).siblings().animate({"bottom":-36});
            }
        });
        this.$('form').validate({
            rules: this.validateRules,
            onkeyup: false,
            focusCleanup: true,
            focusInvalid: false
            //errorContainer: ".failure",
            //errorLabelContainer: '.failure'//,
            //errorElement : 'div',
            //showErrors: this.showErrors.bind(this)
        });
    },
    submit : function(event){
        try{
            if (this.$('form').valid())
                this.controller.send('submit');
        }finally{
            event.preventDefault();
        }
    }
});





WebApp.rootElement ='#ember';


WebApp.Router.map(function() {
    this.resource('welcome', function(){
        this.route('login');
        this.route('signup');            
        this.route('guide');   
         this.route('forget');                                
        this.route('referral', {path: 'referral/:referId'});
    });
     //this.resource('help', function(){
     // });

});

    

/* --------S of MailBox-----------------*/

/* --------E of MailBox-----------------*/

/* --------S of Pagination-----------------*/


WebApp.PaginationView = Ember.View.extend({
    templateName: 'pagination',
    tagName: 'li',

    page: function() {
        return Ember.Object.create({id: this.get('content.page_id')});
    }.property()
});

/* --------E of Pagination-----------------*/


//console.log(WebApp.Mailbox);

/* --------S of Person-----------------*/
/*
WebApp.InfoController = Ember.ArrayController.extend(Ember.PaginationMixin, {
    itemsPerPage:5
});
WebApp.PaginationView = Ember.View.extend({
    templateName: 'pagination',
    tagName: 'li',

    page: function() {
        return Ember.Object.create({id: this.get('content.page_id')});
    }.property()
});
*/
/* --------E of Person-----------------*/
