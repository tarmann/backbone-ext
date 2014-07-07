var SD = {
  Views         : {},
  Models        : {},
  Collections   : {},
  Routers       : {},
  App           : {}
};

SD.Models.UserMail = Backbone.Model.extend({
  url: 'user/mails'
});

SD.Models.User = Backbone.Model.extend({
  url: 'user'
});

SD.Collections.User = Backbone.Model.extend({
  url: 'users'
});

SD.Collections.UserMail = Backbone.Model.extend({
  url: 'user/mails'
});
