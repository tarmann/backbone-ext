var FormMixin = {
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
};