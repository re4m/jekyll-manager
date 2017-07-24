---
title: Reducers
description: Specifies how the application’s state changes in response to action creators.
---

## Configuration

### State

```javascript
{
  config: Object,         // site config object
  updated: Boolean,       // set to true when the config is updated
  editorChanged: Boolean, // set to true when the config editor changes
  isFetching: Boolean     // set to true when the config is being fetched
}
```

## Pages

### State

```javascript
{
  pages: Array,
  page: Object,        // currently visited page
  isFetching: Boolean, // set to true when the page is being fetched
  updated: Boolean     // set to true when the page is updated
}
```

## Collections

### State

```javascript
{
  collections: Array,
  entries: Array,
  currentDocument: Object,
  isFetching: Boolean,     // set to true when the document is being fetched
  updated: Boolean         // set to true when the document is updated
}
```

## Drafts

### State

```javascript
{
  drafts: Array,
  draft: Object,       // currently requested draft
  isFetching: Boolean, // set to true when the draft is being fetched
  updated: Boolean     // set to true when the draft is updated
}
```

## Metadata

### State

```javascript
{
  metadata: Object,        // stores current document's metadata
  new_field_count: Number, // for naming newly created fields
  key_prefix: String,      // Unique component key for sorting MetaArrayItem's properly
  fieldChanged: Boolean    // form submit buttons are enabled when true
}
```

## Data Files

### State

```javascript
{
  files: Array,             // contains all data files and subdirectories in current directory
  currentFile: Object,      // stores current datafile
  isFetching: Boolean       // set to true when a data file is being fetched
  updated: Boolean,         // set to true when a data file is updated
  datafileChanged: Boolean, // set to true when the file is changed in 'Editor' mode
  fieldChanged: Boolean     // set to true when the file is changed in 'GUI' mode
}
```

## Static Files

### State

```javascript
{
  files: Array,        // stores all of the static files
  isFetching: Boolean,
  uploading: Boolean   // stores upload state
}
```

## Templates

### State

```javascript
{
  templates: Array,
  template: Object,    // currently requested template
  isFetching: Boolean, // set to true when the template is being fetched
  updated: Boolean     // set to true when the template is updated
}
```

## Theme

### State

```javascript
{
  theme: Object,       // data from currently used theme-gem
  template: Object,    // currently requested theme-file
  isFetching: Boolean, // set to true when the theme-file is being fetched
  updated: Boolean     // set to true when the theme-file is copied to source directory
}
```

## Dashboard

### State

```javascript
{
  meta: Object,        // contains meta information regarding the Admin interface, the current Site and Jekyll
  isFetching: Boolean, // set to true when the draft is being fetched
}
```

## Utils

### State

```javascript
{
  input: String, // search input
  errors: Array  // form errors
}
```

## Notifications

### State

```javascript
{
  notification: Object
}
```

**Selectors**;
Helper functions for searching contents

```javascript
filterByTitle(list, input)
filterByFilename(list, input)
```
