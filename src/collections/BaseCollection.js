var BaseCollection = {

  // Replace Backbone _prepareModel
  // var model = this._getModel(attrs, options);
 _prepareModel: function(attrs, options) {
    if (attrs instanceof Backbone.Model) return attrs;
    options = options ? _.clone(options) : {};
    options.collection = this;
    var model = this._getModel(attrs, options);
    if (!model.validationError) return model;
    this.trigger('invalid', this, model.validationError, options);
    return false;
  },

  // Provide a method to use custom models
  // for each entry inside the collection.
  _getModel: function(attrs, options){
    return new this.model(attrs, options);
  },

  // Return next relative model based on provide model
  // Takes model or model id as param.
  getPrevModel: function(model){
    return this._getRelativeModelByIndex(model, -1);
  },

  // Return previous relative model based on provide model
  // Takes model or model id as param.
  getNextModel: function(model){
    return this._getRelativeModelByIndex(model, 1);
  },

  // Return model based on relative position.
  // Takes model or model id and relative position as params.
  // Can be used to return previous model or next model.
  _getRelativeModelByIndex: function(model, position){
    var index = ( _.isString(model) || _.isNumber(model) ) ?
          this.indexOf( this.get( model ) ) :
          this.indexOf( model ),
        relativeModel = this.at( index + position );

    return relativeModel;
  }

};

