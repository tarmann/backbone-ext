var BBExt = BBExt || {};

BBExt.CollectionView = BBExt.ItemView.extend({

  initialize: function(options){
    this.options = options || {};
    
    this._bindChildViews();

    this.onInitialize(options);
  },

  onInitialize: function(){},

  // Create a sub view for every model in the collection
  _bindChildViews: function(){
    this.clearChildViews();
    this.collection.each(this._bindChildView, this);
  },

  _bindChildView: function(model){
    var ItemView  = this._getItemView(),
        viewOptions = _.extend({}, { model: model }, this.options.itemViewOptions);

    this.bindView( new ItemView(viewOptions) );
  },

  _getItemView: function(){
    return this.options.itemView || this.itemView;
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

    return this;
  },

  // Render each subview, appending to our root element
  renderCollectionView: function(){
    // TODO: check for browser compatibility
    var container = document.createDocumentFragment();

    this.getCollectionEl().empty();

    _.each(this._childViews, function(childView) {
      container.appendChild(childView.view.render().el);
    }, this);

    this.getCollectionEl().append( container );

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