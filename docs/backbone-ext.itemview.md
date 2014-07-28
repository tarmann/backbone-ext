# Item View

## Resources and Entities

...

```js
var app = BBExt.AppView.extend({

  appRouter        : appRouter,

  regions: {
    'header'       : { el: '[data-region="header"]' },
    'content'      : { el: '[data-region="content"]' }
  },

  resources: {
    'user'           : SD.Models.User,
    'mails'          : SD.Collections.Mail,
    'mailResponses'  : SD.Collections.Mail,
    'mailFolders'    : SD.Collections.MailFolder
  }

});
```