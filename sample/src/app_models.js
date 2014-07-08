var SD = {
  Views         : {},
  Models        : {},
  Collections   : {},
  Routers       : {},
  App           : {}
};

SD.Models.Mail = Backbone.Model.extend({
  urlRoot: 'http://bbextemailapp.apiary-mock.com/mails'
});

SD.Models.User = Backbone.Model.extend({
  url: 'user'
});

SD.Collections.User = Backbone.Model.extend({
  url: 'users'
});

SD.Collections.Mail = Backbone.Model.extend({
  url: 'http://bbextemailapp.apiary-mock.com/mails'
});
