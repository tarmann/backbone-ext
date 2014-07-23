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
      ''                        : 'settings',
      '/personal'               : 'settingsPersonal',
      '/personal/password'      : 'settingsPersonalPassword'
    }}

  ],

  onStart: function(){
    this.appView.header.show( new SD.Views.Header() );
  },

  mailFilter: function(route, args){
    console.log('mailFilter', args);   
    this.appView.content.show( new SD.Views.Mails.LayoutView() );
    route.apply(this, args);
  },

  mail: function(id){
    console.log('mail', id);
  },

  mails: function(id){
    console.log('mails', id);
    this.appView.content.view.main.show( new SD.Views.Mails.CollectionView() );
  },

  settingsFilter: function(route, args){
    // load settings layout view
    route.apply(this, args);
  }

});