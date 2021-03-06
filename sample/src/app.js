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
    'user'           : SD.Models.User,
    'mails'          : SD.Collections.Mail,
    'mailResponses'  : SD.Collections.Mail,
    'mailFolders'    : SD.Collections.MailFolder
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
    '<li><a href="#suppliers/search">Suppliers</a></li>',
    '<li><a href="#suppliers/responses">Responses</a></li>',
    '<li><a href="#suppliers/decision">Decision</a></li>',
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

  template: _.template( ['<div style="padding: 300px 0px; border: solid 1px #ccc; text-align:center;">Settings layout view...</div>'].join('') )

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

  template: _.template( ['<div style="min-height: 400px; border: solid 1px #ccc;" class="clearfix">',
    '<div class="col-sm-12" data-region="tabs" style="border:solid 1px #ccc; min-height: 40px;">',
    '</div>',
    '<div class="col-sm-3" data-region="sidebar" style="border:solid 1px #ccc;">',
    '<ul class="nav nav-pills nav-stacked">',
    '<li><a href="#mail/folder/inbox">Inbox</a></li>',
    '<li><a href="#mail/folder/draft">Draft</a></li>',
    '<li><a href="#mail/folder/trash">Trash</a></li>',
    '</ul>',
    '</div>',
    '<div class="col-sm-9" data-region="main" style="border:solid 1px #ccc;">',
    '</div>',
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

  onInitialize: function(){
    console.log('hi');
  },

  parseViewData: function(viewData){
    viewData.customValue = 'This is a custom value!';
    return viewData;
  }

});

SD.Views.Mails.CollectionView = BBExt.CollectionView.extend({

  collection: new SD.Collections.Mail(),

  className: 'mail-list',

  itemView: SD.Views.Mails.ItemView,

  getItemViewData: function(){
    return { entities: this.entities };
  }

});

/* 
 * ========================================================================
 * Mails
 * ========================================================================
 * 
 */

SD.Views.Mail = BBExt.ItemView.extend({
  
  model: new SD.Models.Mail(),

  resources: {
    'user' : SD.Models.User
  },

  className: 'mail',

  template: _.template( ['<div>',
    'To: <%=user.Name%>.',
    ' Message: <a href="#mail/<%=id%>"><%=title%></a> .',
    '<br />',
    '<br />',
    '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis expedita quia quam numquam, sapiente minima velit quas exercitationem ullam consequuntur eum nisi dolores consectetur doloremque veritatis assumenda dolorem natus excepturi!</p>',
    '<br />',
    '<%=customValue%>',
    '<hr />',
    '<p><a href="#mail/<%=id%>/respond" data-action="respond">Respond</a> | ',
    '<a href="#mail/<%=id%>/respond" data-action="close">Close</a></p>',
    '</div>'].join('') ),

  events: {
    'click [data-action="respond"]:first': '_respond',
    'click [data-action="close"]:first': '_close'
  },

  onInitialize: function(){
    this.listenTo( this.model, 'request', this.renderLoading );
    this.listenTo( this.model, 'sync', this.onSync );
  },

  onSync: function(){
    this.render();
  },

  parseViewData: function(viewData){
    viewData.customValue = 'This is a custom value!';
    return viewData;
  },

  _close: function(e){
    e.preventDefault();
    this.close();
  },

  _respond: function(e){
    e.preventDefault();

    if(! this.getView('response')){
      this.bindView(new SD.Views.Mail({ model: this.model }), 'response');
    }

    this.$el.append( this.getView('response').render().el );
  }

});


/* 
 * ========================================================================
 * Rfx Suppliers
 * ========================================================================
 * 
 */

SD.Views.RfxSuppliers = {};

SD.Views.RfxSuppliers.ItemView = BBExt.ItemView.extend({
  
  model: new SD.Models.Mail(),

  resources: {
    'supplier' : SD.Models.Supplier
  },

  className: 'mail',

  template: _.template( ['<div>',
    'Supplier',
    '</div>'].join('') ),

});


SD.Views.RfxSuppliers.CollectionView = BBExt.CollectionView.extend({

  className: 'rfx-supplier',

  collection: new SD.Collections.Mail(),

  itemView: SD.Views.RfxSuppliers.ItemView,

  getItemViewData: function(){
    return { entities: this.entities };
  }

});