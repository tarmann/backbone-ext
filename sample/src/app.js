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

SD.Views.Header = BBExt.ItemView.extend({
  
  template: _.template( ['<ul class="nav nav-tabs" role="tablist">',
    '<li class="active"><a href="#mail">Messages</a></li>',
    '<li><a href="#settings">Settings</a></li>',
    '</ul>'].join('') )
});

SD.Views.Mails = {};

SD.Views.Mails.LayoutView = BBExt.LayoutView.extend({
  
  template: _.template( ['<div class="col-sm-3" data-region="sidebar">',
    '<a href="#mail/folder/inbox">Inbox</a>',
    '<a href="#mail/folder/draft">Draft</a>',
    '<a href="#mail/folder/trash">Trash</a>',
    '</div>',
    '<div class="col-sm-9" data-region="main">',
    '</div>'].join('') ),

  regions: {
    'main'         : { el: '[data-region="main"]' },
    'sidebar'      : { el: '[data-region="sidebar"]' }
  }

});

SD.Views.Mails.ItemView = BBExt.ItemView.extend({
  
  template: _.template('<div><%=title%> <hr /></div>')

});

SD.Views.Mails.CollectionView = BBExt.CollectionView.extend({

  collection: new SD.Collections.Mail([{ title: 'foo' }, { title: 'bar' }, { title: 'foo' }, { title: 'bar' }]),

  template: _.template(''),

  itemView: SD.Views.Mails.ItemView

});