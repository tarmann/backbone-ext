var BBExt = BBExt || {};

BBExt.CollectionView = BBExt.ItemView.extend({

  initialize: function(){
    this._bindChildViews();
  },

  // Create a sub view for every model in the collection
  _bindChildViews: function(){
    var viewData  = _.extend({}, this.options.itemViewOptions),
        ItemView  = this.options.itemView;

    this.collection.each(function(model) {
      var view = new ItemView(_.extend({}, { model: model }, viewData));
      this.bindView( view );
    }, this);
  },

  // Render collection view, if empty render emptyView
  render: function(){
    if(this.collection.length === 0){
      this.renderEmptyView();
      this.trigger('render:empty', this);
    } else {
      this.renderCollectionView();
      this.trigger('render', this);
    }
  },

  // Render each subview, appending to our root element
  renderCollectionView: function(){
    var container = document.createDocumentFragment();

    this.getCollectionEl().empty();

    _.each(this._childViews, function(childView) {
      container.appendChild(childView.view.render().el);
    }, this);

    this.getCollectionEl().append( this.container );

    return this;
  },

  // Render empty view
	renderEmptyView: function(){
    if(! this.getEmptyView() ) return this;

    this.emptyView = new this.getEmptyView();

    this.$el.html( this.emptyView.render().el );

    return this;
	},

  // Return collection element if defined, otherwise return this.$el
  getCollectionEl: function(){
    return this.$el;
  },

  // Return emptyView if defined, otherwise return null
  getEmptyView: function(){
    return this.options.emptyView || null;
  }

});