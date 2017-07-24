---
title: Components
description: Presentational components.
---

## Editor

Component for editing non-Markdown files.
Supports syntax highlighting for YAML, JSON, HTML, CSS, Sass (`.scss`), Javascript and CoffeeScript based on the file's extension.<br/>
Basically a wrapper for [React Ace editor](https://github.com/securingsincity/react-ace).

### PropTypes

```javascript
{
  content: any,
  onEditorChange: Function,
  type: String,             // File extension without the period. Determines the editor mode.
  editorChanged: Boolean,   // *Optional*
  readOnly: Boolean         // *Optional*. Disables editing content.
}
```


## MarkdownEditor

Component for markdown editor - [SimpleMDE](https://simplemde.com/).

### PropTypes
Can have [all options of SimpleMDE](https://github.com/NextStepWebs/simplemde-markdown-editor#configuration) as prop types.


## Breadcrumbs

Component for generating breadcrumbs.

### PropTypes

```javascript
{
  splat: String, // breadcrumbs links are generated from splat splitting by `/`
  type: String,  // Content type prefix for links (pages, collections..)
}
```


## Errors

Component for listing the validation errors

### PropTypes

```javascript
{
  errors: Array // Array of error messages
}
```


## Button

Generic component for button element.

### PropTypes

```javascript
{
  type: String,       // type of the button ('save', 'create', 'view', 'upload' etc.)
  active: Boolean,    // state of the button
  onClick: Function,  // *Optional*. Callback function triggered when the button is clicked
  triggered: Boolean, // *Optional*. After-click state
  block: Boolean,     // *Optional*. Should the button fill the parent width
  thin: Boolean,      // *Optional*. Should the button be small
  icon: String,       // *Optional*. Displays icon if icon name is given
  to: String          // *Optional*. Links to the given URL. If set, onClick is disabled
}
```


## Dropzone

Component for uploading static files within current directory.

### PropTypes

```javascript
{
  files: Array,            // Lists of files to be uploaded.
  splat: String,           // Supplies the directory path to FilePreview.
  onDrop: Function,        // Called after file(s) are dropped into the component.
  onClickDelete: Function, // Called after the delete-btn `(x)` is clicked.
  onClickItem: Function,   // *Optional*. Called after an item is clicked via static-file-picker.
}
```

## FilePreview

Component for previewing the uploaded file. It renders an image or a div according to the given file.

### PropTypes

```javascript
{
  file: File,              // https://developer.mozilla.org/en-US/docs/Web/API/File
  splat: String,           // directory path of file
  onClickDelete: Function, // *Optional*. Called when the delete-btn `(x)` is clicked.
  onClick: Function        // *Optional*. Called when the individual items are clicked via static-file-picker.
}
```


## Splitter

Horizontal line for splitting views


## Collapsible

Component to fold and unfold sections as required. Always *collapsed*, initially.<br/>
A collapsed section will still affect the dispatched payload.

### PropTypes

```javascript
{
  panel: Object,    // The content to be folded. Can be any visual HTML element or React component.
  label: String,    // The title for the folded content.
  height: Number,   // *Optional*. Used to compute the height of the unfolded content.
  overflow: Boolean // *Optional*. Should contents overflow the panel when necessary. `false` by default.
}
```


## Toggled

Component to determine whether to render a section of content or not based on the state of a *switch*.<br/>
A section switched `off` will not affect the dispatched payload.

### PropTypes

```javascript
{
  panel: Object,      // The content to be hidden.
  label: String,      // The title for the hidden content.
  onChange: Function, // Function called on change of switch state
  checked: Boolean    // *Optional*. Initial state of switch. `false` by default.
}
```


## Form

Set of components rendering special form elements.

### Checkbox

Component to render a Switch.

#### PropTypes

```javascript
{
  text: String,      // The text rendered adjacent to the switch.
  checked: Boolean,  // Switch state.
  onChange: Function // Called on change of switch state.
}
```

### InputPath

Editable path component for edit views

#### PropTypes

```javascript
{
  path: String,      // File path
  type: String,      // Content type for input placeholders
  onChange: Function // Called when the path changes
  onBlur: Function   // *Optional*. Called when component loses focus
}
```

### InputSearch

Component for searching in list views

#### PropTypes

```javascript
{
  search: Function, // callback function triggered when enter key is pressed
  searchBy: String  // search term
}
```

### InputTitle

Editable title component for edit views

#### PropTypes

```javascript
{
  title: String,
  onChange: Function
}
```


## Metadata

Set of components for handling documents' front matters (metafields).<br/>
Additionally doubles as **`DataGUI`** for Data files.

### MetaField

Contains root attributes of the metadata.

#### PropTypes

```javascript
{
  type: String,
  parentType: String,
  addField: Function,
  removeField: Function,
  updateFieldKey: Function,
  updateFieldValue: Function,
  moveArrayItem: Function,
  convertField: Function,
  nameAttr: String,
  namePrefix: String,
  key_prefix: String,
  fieldKey: String,
  fieldValue: any,              // *Optional*
  appMeta: Object               // *Optional*
}
```

### MetaSimple

Leaf component for metadata that contains a simple input, date picker or staticfile
picker depending on the field's key.
Special keys for additional functionalities are `date`, `file` and `image`.

#### PropTypes

```javascript
{
  parentType: String,
  updateFieldValue: Function,
  nameAttr: any,
  fieldKey: String,
  fieldValue: any,             // *Optional*
  appMeta: Object              // *Optional*
}
```

### MetaArray

Contains sortable array items.

#### PropTypes

```javascript
{
  fieldKey: String,
  fieldValue: any,
  nameAttr: String,
  namePrefix: String,
  addField: Function,
  removeField: Function,
  updateFieldKey: Function,
  updateFieldValue: Function,
  convertField: Function,
  moveArrayItem: Function,
  key_prefix: String,
  appMeta: Object               // *Optional*
}
```

### MetaArrayItem

Convertible array item. Can be MetaArray, MetaObject or MetaSimple.

#### PropTypes

```javascript
{
  type: String,
  index: Number,
  fieldKey: String,
  fieldValue: any,
  addField: Function,
  removeField: Function,
  updateFieldKey: Function,
  updateFieldValue: Function,
  moveArrayItem: Function,
  convertField: Function,
  nameAttr: String,
  namePrefix: String,
  key_prefix: String,
  appMeta: Object              // *Optional*
}
```

### MetaObject

Contains object items which allows entering key-value fields.

#### PropTypes

```javascript
{
  fieldKey: String,
  fieldValue: any,
  nameAttr: String,
  namePrefix: String,
  addField: Function,
  removeField: Function,
  convertField: Function,
  updateFieldKey: Function,
  updateFieldValue: Function,
  moveArrayItem: Function,
  key_prefix: String,
  appMeta: Object              // *Optional*
}
```

### MetaObjectItem

Convertible object item. Can be MetaArray, MetaObject or MetaSimple.

#### PropTypes

```javascript
{
  type: String,
  fieldKey: String,
  fieldValue: any,
  nameAttr: String,
  namePrefix: String,
  addField: Function,
  removeField: Function,
  convertField: Function,
  updateFieldKey: Function,
  updateFieldValue: Function,
  moveArrayItem: Function,
  key_prefix: String,
  appMeta: Object             // *Optional*
}
```

### MetaButtons

Contains `convert` and `delete` buttons and sort handle. Dynamically shows the possible
conversion types.

#### PropTypes

```javascript
{
  currentType: String,
  parentType: String,
  onConvertClick: Function,
  onRemoveClick: Function,
  onDropdownFocus: Function,
  onDropdownBlur: Function,
  parentKey: String         // *Optional*
}
```
### MetaTags

Creates tags for front matter based on input and renders a list of suggested tags based on existing tags.

#### PropTypes

```javascript
{
  fieldValue: any,            // Ideally should be an Array. Will render an error unless Array
  updateFieldValue: Function,
  nameAttr: String,
  suggestions: Array          // *Optional*
}
```


## Dashboard

Couple of components used on the Dashboard page.

### GaugeBoard

Graphical component made up of multiple `Gauge` components, GaugeBoard also computes the necessary values to be supplied to each constituent `Gauge`.

#### PropTypes

```javascript
{
  dataSet: Object,   // Data source for the constituent `Gauge` components.
  config: Object,    // The site's config hash.
  baseValue: Number, // The base number upon which percentages are based on.
  layoutArray: Array // Supply an Array of arrays to render multiple rows of `Gauge` components.
}
```

### Gauge

Graphical component that renders based on given percentage.

#### PropTypes

```javascript
{
  percent: Number,     // Value that determines Gauge's progress-bar
  count: Number,       // The number of items under current scope.
  label: String,       // Label for current group of items.
  hoverContents: Array // *Optional*. Contents to be displayed when hovering on a Gauge.
}
```
