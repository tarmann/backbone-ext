SD.Views.AppView = BBExt.AppView.extend({

  appRouter        : SD.App.Router,

  resources: {
    'user'         : SD.Models.User,
    'mails'        : SD.Collections.Mail,
    'mailFolders'  : SD.Collections.MailFolder
  }

});