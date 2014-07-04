var BBExt = BBExt || {};

BBExt.LayoutView = BBExt.ItemView.extend({

  // regions constructor
  regions: {},

  // store regions logic
  _regions: {},

  // region shortcut
  region: null,

  initialize: function(options){
    this.options = options;
    this._initializeRegions();
  },

  _initializeRegions: function(){
    _.each(this.regions, function(options, region){
      this._createRegion(region, options);
    }, this);

    // assign shortcut for region
    this.region = this._regions;
  },

  _createRegion: function(region, options){
    this._regions[region] = {
      // region attributes
      $el     : this.$(options.el),
      name    : region,
      view    : null,
      // region methods
      show    : _.bind(this._showRegion, this, region, options),
      close   : _.bind(this._closeRegion, this, region, options)
    };

    // if 
    if(! this[region]) this[region] = this._regions[region];
  },

  _destroyRegion: function(){

  },

  // Show given View on selected region.
  _showRegion: function(region, options, view){
    this._closeRegion(region);
    
    // trigger before event
    this.trigger('before:show:region', this._regions[region]);
    
    // bind view and parentView to region obj
    this._regions[region].view = view;
    this._regions[region].view.parentView = this;
    
    // render view on current region
    this.$el.empty().append( view.render(options.renderOptions).el );
    
    // trigger show event
    this.trigger('show:region', this._regions[region]);
    
    return view;
  },

  _closeRegion: function(region, options){
    if(! this._regions[region].view) return;
  
    this.trigger('before:close:region', this._regions[region]);

    if(this._regions[region].view.close) {
      this._regions[region].view.close();
    } else {
      this._regions[region].view.remove();
    }

    this.trigger('close:region', this._regions[region]);
  },

  addRegion: function(region, options){
    this._createRegion(region, options);
  },

  removeRegion: function(region){
    this._destroyRegion(region);
  }

});

