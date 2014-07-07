var BBExt = BBExt || {};

BBExt.AppView = BBExt.LayoutView.extend({

  el: function(){
    return document.getElementsByTagName('body')[0];
  },

  initialize: function(options){
    this.options    = options || {};
    this.entities   = this.options.entities || {};
  },

  start: function(){
    if(this._started) return;

    this._bindEntities();
    this._initializeDispatcher();
    this._initializeRouter();

    this._started = true;

    return this;
  },

  _initializeDispatcher: function(){
    this.dispatcher = _.clone(Backbone.Events);
  },

  _initializeRouter: function(options){
    if(! this.options.router) return;

    this.router = new this.options.router();
    this.router.appView = this;
  
    Backbone.history.start();

    return this;
  }

});