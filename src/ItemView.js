var BBExt = BBExt || {};

BBExt.ItemView = Backbone.View.extend({

  // Placeholder for entities settings
  entities: {},

  // Default viewData 
  _viewData: {},

  // Store all nested entities (models, collections)
  _entities: {},

  // Store all nested views 
  _childViews: {},

  // Get viewData object to be used to render view. The view data includes
  // the current model binded to the view, model resources attached to the view
  // and custom data provided on options.
  getViewData: function(options){
    var viewData = this._viewData || {};
    
    if(this.model){
      viewData = _.extend(viewData, this.model.toJSON());
    }

    if(options){
      viewData = _.extend(viewData, options);
    }

    // TODO: include all entities available

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

    if(options.silent) this.trigger('render:before', options);

    this._beforeRender(options);

    this.$el.html( this.template( this.getViewData(options.viewData) ));

    this._afterRender(options);

    if(options.silent) this.trigger('render', options);
    if(options.silent) this.trigger('render:after', options);
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
  bindEntities: function(){
  	_.each(this.entities, function(entity, name){
      this.bindEntity(name, entity);
  	}, this);
  },

  bindEntity: function(name, model_or_collection){
    this._entities[name] = new model_or_collection();
    return this;
  },

  // Parse content of input fields into a object that will be used
  // as a hash to be saved on the model binded to the view.
  // TODO: move to form mixin
  parseForm: function(){
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

