var BBExt = BBExt || {};

BBExt.ItemView = Backbone.View.extend({

  // Default viewData 
  viewData: {},

  // Resources (initialized as entitites)
  resources: {},

  // Constructor for entities (initialized resources)
  entities: {},

  // Store all nested entities (models, collections)
  _entities: {},

  // Store all nested entities (models, collections)
  entity: {},

  // Store all nested views 
  // _childViews: [],

  // Placeholder method for when view is initialized.
  onInitialize: function(){},

  // Return viewData object to be used to render view.
  // Includes the current model binded to the view, entities attached to the view
  // and custom data provided on options.
  getViewData: function(options){
    var viewData = this._viewData || {};
    
    if(this.model){
      viewData = _.extend(viewData, this.model.toJSON());
    }

    _.each(this._entities, function(model_or_collection, entity){
      viewData[entity] = model_or_collection.toJSON();
    }, this);

    if(options){
      viewData = _.extend(viewData, options);
    }    

    return viewData;
  },

  // Render current view using provided template.
  // Takes viewData and silent as options.
  // Trigger the following events: render:before, render:after, render.
  render: function(addOptions){
    if(!this.template) return this;

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

  getEntity: function(name){
  	return this._entities[name];
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
    this.childView = [];
  },

  // Bind view to _childViews
  bindView: function(view, name){
  	if(this === view) return;

    this._childViews = this._childViews || [];

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
    
    if(this._childViews){
      console.log('close childViews', this._childViews.length, this);

      _.each(this._childViews, function(childView, i){
        if(this !== childView.view) childView.view.close();
        // else console.log('View is binded to itself.');
      }, this);

      this.clearChildViews();
    }

    this.trigger('close', this);

    this.remove();
  }

});

