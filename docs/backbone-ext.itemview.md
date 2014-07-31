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
* [States](#states)
* [Resources and Entities](#resources-and-entities)
* [Child Views](#child-views)

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

## States

## Resources and Entities

...

```js
var Mail = BBExt.ItemView.extend({

  resources: {
    'user'         : UserModel,
    'mails'        : MailCollection,
    'folders'      : MailFolderCollection
  }

});
```

## Child Views

