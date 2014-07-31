# Item View

## Documentation Index

* [Methods](#methods)
  * [getViewData](#getViewData)
  * [parseViewData](#parseViewData)
  * [render](#render)
  * [getEntity](#getEntity)
  * [bindEntity](#bindEntity)

### getViewData

### parseViewData

### render

### getEntity

### bindEntity

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

