var SD = {
  Models        : {},
  Collections   : {},
  Routers       : {},
  App           : {}
};

SD.Models.Mail = Backbone.Model.extend({
});

SD.Models.User = Backbone.Model.extend({
});

SD.Collections.User = Backbone.Model.extend({
});

SD.Collections.Mail = Backbone.Model.extend({
});

SD.App.Router = BBExt.AppRouter.extend({

  appRoutes: [
    // Base Routers
    {  prefix: 'mail', filter: 'mailFilter', routes: {
      ''                        : 'mails',
      '/:mail'                  : 'mail',
      '/:mail/respond'          : 'mailResponsd'
    }},
    // Settings Routers
    { prefix: 'settings', filter: 'settingsFilter', routes: {
      '/personal'               : 'settingsPersonal',
      '/personal/password'      : 'settingsPersonalPassword'
    }}
  ],

  mailFilter: function(fn, args){
    console.log('mailFilter', this.appView);
    fn.apply(this, args);
  },

  mail: function(id){
    console.log('mail', id);
  },

  mails: function(id){
    console.log('mails');
  },

  notFound: function(){
    console.log('not found');
  }

});

SD.App = new BBExt.AppView({
  
  entities: {
    'user'  : {},
    'mail'  : {}
  },

  router: SD.App.Router
}).start();