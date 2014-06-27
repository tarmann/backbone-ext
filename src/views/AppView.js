var BBExt = BBExt || {};

BBExt.AppView = Backbone.View.extend({

  el: function(){
    return document.getElementsByTagName('body')[0];
  },

  dispatcher: function(){
    return _.clone(Backbone.Events);
  }, 

  initialize: function(options){
    this.options = options;
    this.initializeRouter();
  },

  initializeRouter: function(options){
    this.router = new this.options.router();
    Backbone.history.start();
    return this;
  }

});