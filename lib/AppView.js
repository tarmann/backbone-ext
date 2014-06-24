Backbone.AppView = Backbone.View.extend({

  dispatcher: _.clone(Backbone.Events),

  entities: {},

  childViews: [],

  initialize: function(){
    this.initializeRouter();
  },

  initializeRouter: function(){
    if(!this.router) return;
    
    this._router = this.router();
    Backbone.history.start();
  },

  bindView: function(view){
    return this;
  }

});

/*
 * ===============================================================
 * ===============================================================
 *
 */


SD.App = new Backbone.Application({

  api: '/api/',

  router: SD.Routers.Rfx,
  
  entities: {
    'User'              : new SD.Models.User(SD.Resources.User),
    'Rfx'               : new SD.Models.Rfx(SD.Resources.Rfx),
    'Organisation'      : new SD.Models.Organisation(SD.Resources.Organisation),
    'RfxElements'       : new SD.Collections.RfxElement([], { rfxId: SD.Resources.Rfx.Id }),
    'RfxSuppliers'      : new SD.Collections.RfxSupplier([], { rfxId: SD.Resources.Rfx.Id }),
    'Suppliers'         : new SD.Collections.Supplier(),
    'OrganisationUsers' : new SD.Collections.OrganisationUser(),
    'Countries'         : new SD.Collections.Country(SD.Resources.Countries)    
  },


});