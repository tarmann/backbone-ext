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
    console.log('mails', this.appView);
  },

  settingsFilter: function(){
    // load settings layout view
    fn.apply(this, args);
  }

});