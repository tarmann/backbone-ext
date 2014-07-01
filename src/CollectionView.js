var CollectionView = {

  render: function(options){
    _.each(this.collection, function(model){
      this.renderItemView(model);
    }, this);

    return this;
  },

  renderItemView: function(model, options){
    var viewData  = _.extend({}, { model: model }, this.options.itemViewOptions),
        view      = new this.options.itemView(viewData);

    this.$el.append( view.render().el );

    return this;
  },

	renderEmptyView: function(options){
    if(! this.options.emptyView) return this;

    this.emptyView = new this.getEmptyView(options);

    this.$el.html( this.emptyView.render().el );

    return this;
	},

  getEmptyView: function(){
    return this.options.emptyView;
  },

  clearEl: function(){
    this.$el.html('');
    return this;
  }

};