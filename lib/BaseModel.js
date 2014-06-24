var BaseView = {

  renderOptions: {
    silent    : false,
    viewData  : {}
  },

  // Placeholder initialize method.
  initialize: function(options){
    this.initializeResources(options.resources);
  },

  // Load models and collections inside view.
  // The resources become available on `this.resources.resourceName`
  initializeResources: function(resources){
    this.resources = {};
    
    _.each(resources, function(resource, name){
      this.resources[name] = resource;
    }, this);

    return this;
  },

  // Get viewData object to be used to render view. The viewData includes
  // the current model binded to the view and additional resoures attached to the view
  // and custom data provided on options.
  getViewData: function(options){
    var viewData;
    // TODO: model, viewData, resources
    return viewData;
  },
  
  // Placeholder method to be executed before view is rendered.
  beforeRender: function(options){
    return this;
  },

  // Render view using provided template.
  // Takes as options `silent` and `viewData`.
  render: function(addOptions){
    var options = _.extend({}, this.renderOptions, addOptions),
        viewData = this.getViewData(options.viewData);

    this.beforeRender(options);

    if(!this.template) return this;

    this.$el.html( this.template( viewData ) );
    
    if(!options.silent) this.trigger('render');

    this.trigger('render', this);
    
    this.afterRender(options);
  
    return this;
  },

  // Render single element inside 
  renderEl: function(el, options){
    return this;
  },

  // Placeholder method.
  afterRender: function(options){
    return this;
  },  

  // Parse content of input fields into a object that will be used
  // as a hash to be saved on the model binded to the view.
  parseForm: function(){
    // TODO: parseForm
    return this.afterParseForm(formData);
  },

  // Custom parse the hash from parseForm method. 
  afterParseForm: function(formData){
    return formData;
	},

  // Parse form and save content on model binded to view.
  save: function(options){
    if(!this.model) return;
    this.model.save( this.parseForm() );
  },

  // Remove view
  close: function(){
    _.each(this.childViews, function(childview){
      childview.close();
    });
    
    this.remove();

    this.trigger('close', this);
  }

};

