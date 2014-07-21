SD.App.Router = BBExt.AppRouter.extend({

  appRoutes: [
    
    // Base Routers
    {  prefix: 'mail', filter: 'mailFilter', routes: {
      ''                        : 'mails',
      '/folder/:folder'         : 'mails',
      '/:mail'                  : 'mail',
      '/:mail/respond'          : 'mailRespond',
      '/:mail/forward'          : 'mailRespond'
    }},

    // Settings Routers
    { prefix: 'settings', filter: 'settingsFilter', routes: {
      '/personal'               : 'settingsPersonal',
      '/personal/password'      : 'settingsPersonalPassword'
    }}

  ],

  mailFilter: function(route, args){
    // load mail layout view
    // this.appView.loadView('main', mailLayoutView);
    // this.appView.regions.main.loadView('sidebar', mailSidebarView);
    route.apply(this, args);
  },

  mail: function(id){
    // this.appView.regions.main.loadView('content', mailView);
    // this.appView.show( new SD.Views.Mails({ collection: new SD.Collections.Mail().set('Id', id) }));
    console.log('mail', id);
  },

  mails: function(id){
    // this.appView.regions.main.loadView('content', mailCollectionView);
    console.log('mail folder', id, this.appView);
  },

  settingsFilter: function(route, args){
    // load settings layout view
    route.apply(this, args);
  }

});