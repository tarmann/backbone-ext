var BBExt = BBExt || {};

BBExt.AppRouter = Backbone.Router.extend({
  
  _bindRoutes: function(){
    _.each(this.appRoutes, function(routeGroup){
      _.each(routeGroup.routes, function(callback, route){
        var name = routeGroup.prefix + route;
        this.route(name, _.bind(this._callRoute, this, routeGroup.filter, callback));
      }, this);
    }, this);
  },

  _callRoute: function(filter, callback){
    var args = Array.prototype.slice.call(arguments, 2);
    
    if(!_.isFunction(this[callback])) return;

    if( _.isFunction(this[filter])) this[filter].apply(this, args);
      
    this[callback].apply(this, args);
  }

});