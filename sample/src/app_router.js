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

  onAppStart: function(){
    this.appView.header.show( new SD.Views.Header() );
  },

  mailFilter: function(route, args){
    // console.log('route:mailFilter', args);
    route.apply(this, args);
  },

  mail: function(id){
    // console.log('route:mail', id);
  },

  mails: function(query){
    // console.log('route:mails', query);
    this.appView.content.show( new SD.Views.Mails.LayoutView() );
    
    this.appView.content.view.main.show( new SD.Views.Mails.CollectionView({
      filter          : query,
      itemViewOptions : { entities: this.appView.entities }
    }) );
  },

  settingsFilter: function(route, args){
    // console.log('route:settingsFilter', args);   
    route.apply(this, args);
  },

  settings: function(){
    this.appView.content.show( new SD.Views.Settings.LayoutView() );
  }

});