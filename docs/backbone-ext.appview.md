# App View

```js
var app = BBExt.AppView.extend({

  appRouter        : appRouter,

  regions: {
    'header'       : { el: '[data-region="header"]' },
    'content'      : { el: '[data-region="content"]' }
  },

  resources: {
    'user'           : SD.Models.User,
    'mails'          : SD.Collections.Mail
  }

});
```

## Router

## Start

