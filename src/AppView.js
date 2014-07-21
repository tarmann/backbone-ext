var BBExt = BBExt || {};

BBExt.AppView = BBExt.LayoutView.extend({

  el: function(){
    return document.getElementsByTagName('body')[0];
  },

  initialize: function(options){
    this.options    = options || {};
    this.entities   = this.options.entities || {};
    this._bindEntities();
  },

  start: function(){
    if(this._started) return;

    this._initializeDispatcher();
    this._initializeRouter();

    this._started = true;

    return this;
  },

  _initializeDispatcher: function(){
    this.dispatcher = _.clone(Backbone.Events);
  },

  _initializeRouter: function(options){
    if(! this.appRouter) return;

    this.router = new this.appRouter();
    this.router.appView = this;
  
    Backbone.history.start();

    return this;
  }

});