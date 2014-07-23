/* 
 * ========================================================================
 * App
 * ========================================================================
 * 
 */

SD.Views.AppView = BBExt.AppView.extend({

  appRouter        : SD.App.Router,

  regions: {
    'header'       : { el: '[data-region="header"]' },
    'content'      : { el: '[data-region="content"]' }
  },

  resources: {
    'user'         : SD.Models.User,
    'mails'        : SD.Collections.Mail,
    'mailFolders'  : SD.Collections.MailFolder
  }

});

/* 
 * ========================================================================
 * Header
 * ========================================================================
 * 
 */

SD.Views.Header = BBExt.ItemView.extend({
  
  className: 'header',

  template: _.template( ['<ul class="nav nav-tabs" role="tablist">',
    '<li class="active"><a href="#mail">Messages</a></li>',
    '<li><a href="#settings">Settings</a></li>',
    '</ul>'].join('') )
});

/* 
 * ========================================================================
 * Settings
 * ========================================================================
 * 
 */

SD.Views.Settings = {};

SD.Views.Settings.LayoutView = BBExt.LayoutView.extend({
  
  className: 'settings',

  template: _.template( ['Settings layout view...'].join('') )

});

/* 
 * ========================================================================
 * Mails
 * ========================================================================
 * 
 */

SD.Views.Mails = {};

SD.Views.Mails.LayoutView = BBExt.LayoutView.extend({
  
  className: 'mails',

  template: _.template( ['<div class="col-sm-3" data-region="sidebar">',
    '<div><a href="#mail/folder/inbox">Inbox</a></div>',
    '<div><a href="#mail/folder/draft">Draft</a></div>',
    '<div><a href="#mail/folder/trash">Trash</a></div>',
    '</div>',
    '<div class="col-sm-9" data-region="main">',
    '</div>'].join('') ),

  regions: {
    'main'         : { el: '[data-region="main"]' },
    'sidebar'      : { el: '[data-region="sidebar"]' }
  }

});

SD.Views.Mails.ItemView = BBExt.ItemView.extend({
  
  resources: {
    'user'         : SD.Models.User,
    'responses'    : SD.Collections.Mail
  },

  className: 'mail-item',

  template: _.template( ['<div>',
    'To: <%=user.Name%>.',
    ' Message: <a href="#mail/<%=id%>"><%=title%></a> .',
    '<br />',
    '<%=customValue%>',
    '<hr /></div>'].join('') ),

  parseViewData: function(viewData){
    viewData.customValue = 'This is a custom value!';
    console.log(viewData);
    return viewData;
  },

  onInitialize: function( options ){
    this.entity.responses.reset([
      { id: 456541, title: 'Job Code 1234: District Sales Manager - Your Name' },
      { id: 546545, title: 'Meeting Follow Up - Your Name' },
      { id: 545223, title: 'ABC College Informational Interview Request' },
      { id: 545624, title: 'Managing Director Position' }]
    );
  }

});

SD.Views.Mails.CollectionView = BBExt.CollectionView.extend({

  collection: new SD.Collections.Mail(),

  className: 'mail-list',

  template: _.template(''),
  
  itemView: SD.Views.Mails.ItemView,
  
  mails: {
    'inbox': [
      { id: 456541, title: 'Job Code 1234: District Sales Manager - Your Name' },
      { id: 546545, title: 'Meeting Follow Up - Your Name' },
      { id: 545223, title: 'ABC College Informational Interview Request' },
      { id: 545624, title: 'Managing Director Position' }],

    'draft': [
      { id: 5, title: 'draft' },
      { id: 6, title: 'bar' }],
    
    'trash': [
      { id: 7, title: 'trash' } ]
  },

  beforeInitialize: function( options ){
    this.collection.reset( this.mails[options.filter] );
  }

});