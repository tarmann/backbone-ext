var SD = {
  Views         : {},
  Models        : {},
  Collections   : {},
  Routers       : {},
  App           : {}
};

SD.Models.MailFolder = Backbone.Model.extend({
  urlRoot: 'http://bbextemailapp.apiary-mock.com/mail/folders'
});

SD.Models.Mail = Backbone.Model.extend({
  
  urlRoot: 'http://bbextemailapp.apiary-mock.com/mails',

  defaults: {
    'id'      : 1,
    'title'   : '',
    'body'    : '',
  }

});

SD.Models.User = Backbone.Model.extend({
  
  url: 'http://bbextemailapp.apiary-mock.com/user',

  defaults: {
    'Name'    : 'Tony Stark'
  }

});

SD.Collections.User = Backbone.Collection.extend({
  url: 'http://bbextemailapp.apiary-mock.com/user'
});

SD.Collections.Mail = Backbone.Collection.extend({
  
  url: 'http://bbextemailapp.apiary-mock.com/mails'

});

SD.Collections.MailFolder = Backbone.Collection.extend({
  url: 'http://bbextemailapp.apiary-mock.com/mail/folders'
});

SD.Collections.Suppliers = Backbone.Collection.extend({
  url: 'http://bbextemailapp.apiary-mock.com/suppliers'
});

SD.Collections.RfxSuppliers = Backbone.Collection.extend({
  url: 'http://bbextemailapp.apiary-mock.com/rfx/suppliers'
});

SD.Collections.RfxResponses = Backbone.Collection.extend({
  url: 'http://bbextemailapp.apiary-mock.com/rfx-suppliers-response'
});

SD.Collections.RfxDecision = Backbone.Collection.extend({
  url: 'http://bbextemailapp.apiary-mock.com/rfx-suppliers-decision'
});