var BBExt = BBExt || {};

BBExt.CollectionView = BBExt.ItemView.extend({

  _bbExt: 'CollectionView',

  initialize: function(options){
    this.options = options || {};
    
    this.beforeInitialize(options);
    
    // this._bindChildViews();
    this._bindEvents();
    
    this.onInitialize(options);
  },

  onInitialize: function(){},

  // TODO: wait for all entities required to load
  _bindEvents: function(){
    this.listenTo(this.collection, 'request', this.renderLoading);
    this.listenTo(this.collection, 'reset', this._bindChildViews);
    this.once('change:child_views', this.render);
  },

  // Create a sub view for every model in the collection
  _bindChildViews: function(){
    this.clearChildViews();
    this.collection.each(this._bindChildView, this);
    this.trigger('change:child_views');
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
    } else {
      this.renderCollectionView();
    }
    
    this.trigger('render', this);

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

  // TODO: render empty view
	renderEmptyView: function(){
    // if(! this.getEmptyView() ) return this;

    // this.emptyView = new this.getEmptyView();

    // this.$el.html( this.emptyView.render().el );
    this.getCollectionEl().html( 'Collection is empty.' );

    this.trigger('render:empty', this);

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