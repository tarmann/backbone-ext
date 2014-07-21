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
  urlRoot: 'http://bbextemailapp.apiary-mock.com/mails'
});

SD.Models.User = Backbone.Model.extend({
  url: 'http://bbextemailapp.apiary-mock.com/user'
});

SD.Collections.User = Backbone.Model.extend({
  url: 'http://bbextemailapp.apiary-mock.com/user'
});

SD.Collections.Mail = Backbone.Model.extend({
  url: 'http://bbextemailapp.apiary-mock.com/mails'
});

SD.Collections.MailFolder = Backbone.Model.extend({
  url: 'http://bbextemailapp.apiary-mock.com/mail/folders'
});
