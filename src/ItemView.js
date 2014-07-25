var BBExt = BBExt || {};

BBExt.ItemView = Backbone.View.extend({

  // Default viewData 
  viewData: {},

  // Resources (initialized as entitites)
  resources: {},

  // Constructor for entities (initialized resources)
  // entities: {},

  // Store all nested entities (models, collections)
  _entities: {},

  // Store all nested entities (models, collections)
  entity: {},

  // Store all nested views 
  // _childViews: [],

  // Placeholder method for when view is initialized.
  initialize: function(options){
    this.options = options || {};
    this.entities = this.options.entities || {};
    
    this.clearChildViews();
    
    this.beforeInitialize();
    this._bindEntities();
    this.onInitialize(options);
  },

  // Placeholder method for when view is initialized.
  beforeInitialize: function(){},
  
  // Placeholder method for when view is initialized.
  onInitialize: function(){},

  // Return viewData object to be used to render view.
  // Includes the current model binded to the view, entities attached to the view
  // and custom data provided on options.
  getViewData: function(options){
    var viewData = this._viewData || {};
    
    _.each(this._entities, function(model_or_collection, entity){
      viewData[entity] = model_or_collection.toJSON();
    }, this);

    if(this.model){
      viewData = _.extend(viewData, this.model.toJSON());
    }

    if(options){
      viewData = _.extend(viewData, options);
    }

    return this.parseViewData(viewData);
  },

  parseViewData: function(viewData){
    return viewData;
  },

  // Render current view using provided template.
  // Takes viewData and silent as options.
  // Trigger the following events: render:before, render:after, render.
  render: function(addOptions){
    if(! this.template) return this;

    var options = _.extend({}, {
      silent    : false,
      viewData  : {}
    }, addOptions);

    if(options.silent) this.trigger('before:render', options);

    this._beforeRender(options);

    this.$el.html( this.template( this.getViewData(options.viewData) ));

    this._afterRender(options);

    if(options.silent) this.trigger('render', options);

    return this;
  },

  // TODO: Render single element inside 
  renderLoading: function(){
    this.$el.html('loading...');
  },

  // TODO: Render single element inside 
  renderEl: function(el, options){
    return this;
  },

  // Private placeholder method executed before view is rendered
  _beforeRender: function(options){
    return this;
  },

  // Private placeholder method executed after view is rendered
  _afterRender: function(options){
    return this;
  },  

  getEntity: function(entity_or_entities){
  	return this._entities[entity_or_entities];
  },

  // bind entities from this.entities
  _bindEntities: function(){
  	_.each(this.resources, function(model_or_collection, name){
      this._bindEntity(name, model_or_collection);
  	}, this);
  },

  _bindEntity: function(name, model_or_collection){

    if( this.entities[name] ) {
      this._entities[name] = this.entity[name] = this.entities[name];
    } else {
      this._entities[name] = this.entity[name] = new model_or_collection();
    }

    // bind model_or_collection as an entity (one model_or_collection for each view)
    // if(name === 'model') this.model = this.entity[name];
    // if(name === 'collection') this.collection = this.entity[name];

    return this;
  },

  _fetchEntitites: function(name, options){
    var xhr = [];
    
    _.each(this.entity, function(){}, this);
  },

  bindEntity: function(name, model_or_collection){
    this._bindEntity(name, model_or_collection);
  },

  clearChildViews: function(){
    this._childViews = [];
  },

  // Bind view to _childViews
  bindView: function(view, name){
  	if(this === view) return;

    this._childViews.push({
      cid 	: view.cid,
      name	: name || view.cid,
      view 	: view
  	});

    view.parentView = this;

  	return this;
  },

  // Remove view
  close: function(){

    if( this._childViews ){
      _.invoke( _.pluck(this._childViews, 'view'), 'close' );
      this.clearChildViews();
    }

    this.trigger('close', this);

    this.remove();
  }

});

