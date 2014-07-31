# Item View

## Documentation Index

* [Events](#Events)
* [Methods](#methods)
  * [getViewData](#getviewdata)
  * [parseViewData](#parseviewdata)
  * [render](#render)
  * [getEntity](#getentity)
  * [bindEntity](#bindentity)
  * [close](#close)


## Events

* beforeInitialize
* onInitialize
* beforeRender
* onRender
* onClose

## Methods

### getViewData

### parseViewData

### render

### getEntity

### bindEntity

## Close

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

