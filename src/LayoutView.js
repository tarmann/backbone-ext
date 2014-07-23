var BBExt = BBExt || {};

BBExt.LayoutView = BBExt.ItemView.extend({

  _childViews: [],

  // regions constructor
  // regions: {},

  // store regions logic
  // _regions: {},

  // region shortcut
  region: {},

  initialize: function(options){
    this.options = options;
    
    this._bindEntities();

    this._initializeRegions();
  },

  _initializeRegions: function(){
    this.clearChildViews();
    this.clearRegions();

    _.each(this.regions, function(options, region){
      this._createRegion(region, options);
    }, this);

    // assign shortcut for region
    this.region = this._regions;
  },

  clearRegions: function(){
    this._regions = {};
  },

  _createRegion: function(region, options){
    this._regions[region] = {
      // region attributes
      name    : region,
      el      : options.el,
      $el     : null,
      view    : null,
      // region methods
      show    : _.bind(this._showRegion, this, region, options),
      close   : _.bind(this._closeRegion, this, region, options)
    };

    // if ...
    if(! this[region]) this[region] = this._regions[region];
  },

  _bindRegionEl: function(region){
    if( this._regions[region].$el ) return;
    this._regions[region].$el = this.$( this._regions[region].el );
  },

  _destroyRegion: function(){},

  // Show given View on selected region.
  _showRegion: function(region, options, view){
    this._closeRegion(region);

    // console.log('_showRegion', region);

    this._bindRegionEl(region);

    // trigger before event
    this.trigger('before:show:region', this._regions[region]);
    
    // bind view and parentView to region obj
    this._regions[region].view = view;

    // this._regions[region].view.parentView = this;
    this.bindView( view, 'region_' + region );
    
    // render view on current region
    this._regions[region].$el
      .empty()
      .append( view.render(options.renderOptions).el );
    
    // trigger show event
    this.trigger('show:region', this._regions[region]);
    this.trigger('show:region:'+region, this._regions[region]);
    
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

