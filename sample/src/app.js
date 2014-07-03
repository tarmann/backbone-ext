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
    // load mail layout view
    // this.appView.loadView('main', mailLayoutView);
    // this.appView.regions.main.loadView('sidebar', mailSidebarView);
    fn.apply(this, args);
  },

  mail: function(id){
    // this.appView.regions.main.loadView('content', mailView);
    console.log('mail', id);
  },

  mails: function(id){
    // this.appView.regions.main.loadView('content', mailCollectionView);
    console.log('mails');
  },

  settingsFilter: function(){
    // load settings layout view
    fn.apply(this, args);
  }

});

SD.App = new BBExt.AppView({
  
  router: SD.App.Router,
  
  entities: {
    'user'          : {},
    'organisation'  : {},
    'mail'          : {}
  },

  // header region

  // footer region

}).start();





var MyLayoutView = BBExt.LayoutView.extend({
  regions: {
    sidebar: { el: '.sidebar' },
    content: { el: '.content' }
  }
});

var myLayout = new MyLayoutView();