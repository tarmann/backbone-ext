SD.Views.AppView = BBExt.AppView.extend({

  resources: {
    'user'   : SD.Models.User,
    'mails'  : SD.Collections.UserMail
  }

});

SD.app = new SD.Views.AppView({

  router: SD.App.Router,

  entities: {
    'user'  : new SD.Models.User()
  }

}).start();