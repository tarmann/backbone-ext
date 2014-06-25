var BaseView = {

  // Get viewData object to be used to render view. The view data includes
  // the current model binded to the view, model resources attached to the view
  // and custom data provided on options.
  getViewData: function(options){
    var viewData;
    // TODO: model, viewData, resources
    return viewData;
  },
  
  beforeRender: function(options){
    return this;
  },

  render: function(options){
    this.beforeRender(options);
    // TODO: render
    this.afterRender(options);
    this.trigger('render', this);
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
    this.trigger('close', this);
    this.remove();
  }

};

