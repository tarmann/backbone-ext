var BBExt = BBExt || {};

BBExt.BaseModel = Backbone.Model.extend({

  // Overwrites backbone save method allowing to trim attributes
  // and only save attributes on serverAttrs object.
  save: function(attrs, options) {
      attrs = attrs || this.toJSON();
      options = options || {};

      // If model defines serverAttrs, replace attrs with trimmed version
      if (this.serverAttrs) attrs = _.pick(attrs, this.serverAttrs);

      // Move attrs to options
      options.attrs = attrs;

      // Call super with attrs moved to options
      Backbone.Model.prototype.save.call(this, attrs, options);
  },

  // Allow a Model to run controller methods
  // custom responses response status codes.
  _run: function(method, addOptions){
    var self = this,
        options = _.extend({
        'ajax'    : {},
        'global'  : false,
        'event'   : 'custom',
        'events'  : {
          'success' : 'custom',
          'error'   : 'custom',
          '400'     : '400',
          '401'     : '401',
          '403'     : '403',
          '423'     : '423'
        }
      }, addOptions);

    // parse url
    var rootUrl = (_.isFunction(this.url)) ? this.url() : this.url,
        url = rootUrl + (rootUrl.charAt(rootUrl.length - 1) === '/' ? '' : '/');

    // parse data
    options.ajax.data = JSON.stringify( options.ajax.data || this.attributes );

    var ajax = _.extend({}, {
      url: url + method,
      type: 'post',
      dataType: 'json',
      contentType : 'application/json',
      success: function (data) {
        self.trigger('sync:' + method, data);
        self.trigger('sync:' + options.event, data);
      },
      error: function (data) {
        self.trigger('error:' + options.event, data);
      },
      statusCode: {
        200: function (data) {
          self.trigger('sync:' + method, data);
        },
        400: function (data) {
          self.trigger('invalid:' + method, data);
          self.trigger('invalid:' + options.events['400'], data);
        },
        401: function (data) {
          self.trigger('invalid:' + options.events['401'], data);
        },
        403: function (data) {
          self.trigger('invalid:' + options.events['403'], data);
        },
        423: function (data) {
          self.trigger('invalid:' + options.events['423'], data);
        }
      }
    }, options.ajax);

    $.ajax(ajax);
  }

});
