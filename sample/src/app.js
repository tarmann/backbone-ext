var SD = {
  Models        : {},
  Collections   : {},
  Routers       : {},
  App           : {}
};

SD.Models.User = Backbone.Model.extend({});
SD.Collections.User = Backbone.Model.extend({});

SD.App.Router = BBExt.AppRouter.extend({

  appRoutes: [
    // Base Routers
    {  prefix: 'mail', filter: 'mailFilter', routes: {
      ''                        : 'mails',
      '/:mail'                  : 'mail'
    }},
    // Settings Routers
    { prefix: 'settings', filter: 'settingsFilter', routes: {
      '/personal'               : 'settingsPersonal',
      '/personal/password'      : 'settingsPersonalPassword'
    }}
  ],

  mailFilter: function(fn, args){
    console.log('filter', args);
    fn.apply(this, args);
  },

  mail: function(id){
    console.log('load mail view', id);
  },

  mails: function(id){
    console.log('load mails view');
  },

  notFound: function(){
    console.log('not found');
  }

});

SD.App = new BBExt.AppView({

  router: SD.App.Router

});