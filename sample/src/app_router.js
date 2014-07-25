SD.App.Router = BBExt.AppRouter.extend({

  appRoutes: [
    
    // Base Routers
    {  prefix: '', filter: 'mailFilter', routes: {
      ''                        : 'mails'
    }},

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
    this.appView.content.show( new SD.Views.Mails.LayoutView() );
    
    route.apply(this, args);
  },

  mails: function(query){
    var region         = this.appView.content.view.main,
        collection     = this.appView.entity.mails;
    
    // show view
    region.show( new SD.Views.Mails.CollectionView({
      collection       : collection,
      itemViewOptions  : { entities: this.appView.entities }
    }));
    
    // fetch entity
    collection.fetch({ data: { folder: query }, reset: true });
  },

  mail: function(id){  
    this.appView.content.view.main.show( new SD.Views.Mail() );
    this.appView.content.view.main.view.model.fetch();
  },

  settingsFilter: function(route, args){
    route.apply(this, args);
  },

  settings: function(){
    this.appView.content.show( new SD.Views.Settings.LayoutView() );
  }

});