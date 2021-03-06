var BBExt = BBExt || {};

BBExt.AppRouter = Backbone.Router.extend({

  initialize: function(options){
    this.appView = options.appView;
    this.listenTo( this.appView, 'start', this.onAppStart );
    this.listenTo( this.appView, 'initialize', this.onAppInitialize );
  },

  refresh: function(){
    Backbone.history.loadUrl(Backbone.history.fragment);
  },

  setFragment: function(fragment){
    window.history.pushState('', '', fragment);
  },

  _bindRoutes: function(){
    _.each(this.appRoutes, function(routeGroup){
      _.each(routeGroup.routes, function(callback, route){
        var name = routeGroup.prefix + route;
        this.route(name, _.bind(this._callRoute, this, routeGroup.prefix, routeGroup.filter, callback));
      }, this);
    }, this);
  },

  // Call route wrapping callback with filter method.
  // Filter receives fn and args as params.
  // Use fn.apply(this, args); to continue execution.
  _callRoute: function(routeGroup, filter, callback){
    var args = Array.prototype.slice.call(arguments, 3),
        filterCallback;

    if(!_.isFunction(this[callback])) return;

    return ( _.isFunction(this[filter])) ?
      this[filter].call(this, this[callback], args) :
      this[callback].apply(this, args);
  },

  notFound: function(){
    console.log('route not found');
  }

});