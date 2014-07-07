var BBExt = BBExt || {};

BBExt.ItemView = Backbone.View.extend({

  // Resources (initialized as entitites)
  resources: {},

  // Constructor for entities (initialized resources)
  entities: {},

  // Default viewData 
  viewData: {},

  // Store all nested entities (models, collections)
  _entities: {},

  // Store all nested entities (models, collections)
  entity: {},

  // Store all nested views 
  _childViews: [],

  // Store all nested views 
  childView: [],

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
  },

  // TODO: Render single element inside 
  renderEl: function(el, options){
    return this;
  },

  // Placeholder method executed before view is rendered
  _beforeRender: function(options){
    return this;
  },

  // Placeholder method executed after view is rendered
  _afterRender: function(options){
    return this;
  },  

  getEntity: function(name){
  	return this._entities[name];
  },

  // bind entities from this.entities
  _bindEntities: function(){
  	_.each(this.resources, function(entity, name){
      this._bindEntity(name, entity);
  	}, this);
  },

  _bindEntity: function(name, model_or_collection){

    if( this.entities[name] ) {
      this._entities[name] = this.entity[name] = this.entities[name];
    } else {
      this._entities[name] = this.entity[name] = new model_or_collection();
      
      // TODO: implement events for loaded resources
      this.entity[name].fetch();
    }

    if(name === 'model') this.model = this.entity[name];
    if(name === 'collection') this.collection = this.entity[name];

    return this;
  },

  bindEntity: function(){
    this._bindEntity(name, model_or_collection);
  },

  // Bind view to _childViews
  bindView: function(view, name){
  	this._childViews.push({
      cid 	: view.cid,
      name	: name || view.cid,
      view 	: view
  	});

  	return this;
  },

  // TODO: move to form mixin
  // Parse content of input fields into a object that will be used
  // as a hash to be saved on the model binded to the view.
  parseForm: function(formName){
    // TODO: parseForm
    return this.afterParseForm(formData);
  },

  // Custom parse the hash from parseForm method. 
  // TODO: move to form mixin
  afterParseForm: function(formData){
    return formData;
	},

  // Parse form and save content on model binded to view.
  // TODO: move to form mixin
  save: function(options){
    if(!this.model) return;
    this.model.save( this.parseForm() );
  },

  // Remove view
  close: function(){
    this.trigger('close', this);
    this.remove();
  }

});

