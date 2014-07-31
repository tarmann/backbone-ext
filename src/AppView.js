var BBExt = BBExt || {};

BBExt.AppView = BBExt.LayoutView.extend({

  _bbEXT: 'AppView',

  constructor: function(){
    BBExt.LayoutView.apply(this, arguments);
  },

  el: function(){
    return document.getElementsByTagName('body')[0];
  },

  initialize: function(options){
    this.options    = options || {};
    
    this._bindEntities();
    this._initializeLayoutView();

    this.trigger('initialize');
  },

  start: function(){
    if(this._started) return;

    this._initializeDispatcher();
    this._initializeRouter();

    this._started = true;

    this.trigger('start');

    return this;
  },

  _initializeDispatcher: function(){
    this.dispatcher = _.clone(Backbone.Events);
  },

  _initializeRouter: function(options){
    if(! this.appRouter) return;

    this.router = new this.appRouter({ appView: this });
    
    Backbone.history.start();

    return this;
  }

});