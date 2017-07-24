---
title: Containers
description: Container components which connect the presentational components to Redux.
---

## Sidebar

Container for listing all of routes' links.<br/>
The links are dynamically rendered based on individual category size. e.g. The link to `/datafiles` won't be rendered if there are no data files at the site's source.

> ***Tip:** In the above case, create a new data file via the Dashboard*

### PropTypes

```javascript
{
  site: Object,  // Filtered cummulative payload data of current site
  config: Object // Current site's configuration data
}
```

## Header

Container for displaying header which includes title, homepage link and the current version of the admin interface.

### PropTypes

```javascript
{
  admin: Object, // Meta info regarding the admin interface
  config: Object // Current site's configuration data
}
```

## MetaFields

Main container for metafields. Generates list, object or plain inputs for front
matters other than `title`, `body`, `path` and `draft`. Doubles as a GUI to edit
data files. The GUI will parse the input and write valid YAML to file,
consequently removing any comments previously present, and also converting
boolean to string literals i.e. `true` & `false` will be written as `'true'`
and `'false'`.

### PropTypes

```javascript
{
  fields: Object,
  metadata: Object,
  key_prefix: String,
  storeContentFields: Function,
  addField: Function,
  removeField: Function,
  updateFieldKey: Function,
  updateFieldValue: Function,
  moveArrayItem: Function,
  convertField: Function,
  dataview: Boolean,              // *Optional*
  type: String,                   // *Optional*
  fetchMeta: Function,            // *Optional*
  appMeta: Object                 // *Optional*
}
```

## Notifications

Container for showing notifications at the right bottom of the screen

### PropTypes

```javascript
{
  notification: Object
}
```


The following contain views linked with the routes.

## Configuration

Container for Configuration view. Consists of a raw-text-editor, a YAML GUI-editor, a toggle button to switch between the two editors, and a save button.

The save button is activated when either of the editors change.

While the raw-text-editor will output raw-content as entered into the editor, the GUI-editor will output YAML data parsed from
the input values which will result in removal of any existing comments and any extra spaces around the colon following the config key.

### PropTypes

```javascript
{
  config: Object,
  onEditorChange: Function,
  putConfig: Function,
  error: String,
  updated: Boolean,
  editorChanged: Boolean,
  fieldChanged: Boolean,
  errors: Array,
  clearErrors: Function,
  router: Object,
  route: Object
}
```

## Pages

Container for Pages view. Lists available pages and directories.

### PropTypes

```javascript
{
  pages: Array,
  fetchPages: Function,
  deletePage: Function,
  isFetching: Boolean,
  search: Function,
  params: Object
}
```

## PageEdit

Container for editing a page.

### PropTypes

```javascript
{
  page: Object,
  fetchPage: Function,
  deletePage: Function,
  putPage: Function,
  updateTitle: Function,
  updateBody: Function,
  updatePath: Function,
  clearErrors: Function,
  isFetching: Boolean,
  errors: Array,
  fieldChanged: Boolean,
  updated: Boolean,
  params: Object,
  router: Object,
  route: Object,
  new_field_count: Number // *Optional*
}
```

## PageNew

Container for creating a new page.

### PropTypes

```javascript
{
  putPage: Function,
  updateTitle: Function,
  updateBody: Function,
  updatePath: Function,
  clearErrors: Function,
  errors: Array,
  fieldChanged: Boolean,
  updated: Boolean,
  params: Object,
  router: Object,
  route: Object,
  new_field_count: Number  // *Optional*
}
```

## Documents

Container for Documents view. Lists documents and directories of a collection.

### PropTypes

```javascript
{
  currentDocuments: Array,
  fetchCollection: Function,
  deleteDocument: Function,
  search: Function,
  isFetching: Boolean,  
  params: Object
}
```

## DocumentEdit

Container for editing a document.

### PropTypes

```javascript
{
  currentDocument: Object,
  fetchDocument: Function,
  deleteDocument: Function,Boolean,
  putDocument: Function,
  updateTitle: Function,
  updateBody: Function,
  updatePath: Function,
  clearErrors: Function,
  isFetching: Boolean,
  errors: Array,
  fieldChanged: Boolean,
  updated: Boolean,
  params: Object
}
```

## DocumentNew

Container for creating a new document.

### PropTypes

```javascript
{
  putDocument: Function,
  updateTitle: Function,
  updateBody: Function,
  updatePath: Function,
  updateDraft: Function,
  clearErrors: Function,
  errors: Array,
  fieldChanged: Boolean
}
```

## DataFiles

Container for DataFiles view. Lists data files.

### PropTypes

```javascript
{
  files: Array,
  fetchDataFiles: Function,
  deleteDataFile: Function,
  search: Function,
  isFetching: Boolean,
  search: Function,
  params: Object
}
```

## DataFileEdit

Container for editing a data file. Supports editing via a raw text editor or a YAML editor GUI.

### PropTypes

```javascript
{
  datafile: Object,
  isFetching: Boolean,
  updated: Boolean,
  datafileChanged: Boolean,
  fieldChanged: Boolean,
  fetchDataFile: Function,
  putDataFile: Function,
  deleteDataFile: Function,
  clearErrors: Function,
  onDataFileChanged: Function,
  errors: Array,
  params: Object,
  router: Object,
  route: Object
}
```

## DataFileNew

Container for creating a new data file.

Includes a *GUI Editor* for easily creating YAML or JSON data files.
Simply input the file's basename, the filetype (`YAML` or `JSON`) and data. The GUI will create the corresponding file with suitable extensions. CSV files cannot be created via the GUI Editor.

### PropTypes

```javascript
{
  datafile: Object,
  putDataFile: Function,
  onDataFileChanged: Function,
  clearErrors: Function,
  errors: Array,
  updated: Boolean,
  datafileChanged: Boolean,
  params: Object,
  router: Object,
  route: Object
  fieldChanged: Boolean // optional
}
```

## StaticFiles

Container for StaticFiles view. Lists all of static files and let users upload/delete static files. It uses `react-dropzone` for drag & drop file uploading.
Uploaded files are previewed via `FilePreview` component.

### PropTypes

```javascript
{
  files: Array,
  fetchStaticFiles: Function,
  uploadStaticFiles: Function,
  deleteStaticFile: Function,
  search: Function,
  isFetching: Boolean,
}
```

## NotFound

Component for 404 page. react-router renders this component for all non-existing routes.
