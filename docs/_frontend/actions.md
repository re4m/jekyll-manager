---
title: Actions
description: Actions are payloads of information that send data from the application to the store.
---

## Configuration

### `fetchConfig()`

Async action for fetching an object comprised of Jekyll project configuration (from `_config.yml` by default)

### `putConfig(config, source='editor')`

Async action for updating Jekyll project configuration, after ensuring the content is not empty.
`source` denotes whether the point of origin is the `Editor` component (*`editor`*) or `DataGUI` (*`gui`*).

### `validateConfig(config)`

Action for checking whether the YAML editor has content.

### `onEditorChange()`

Action for notifying whether the YAML editor has changed after last update


## Pages

### `fetchPages(directory = '')`

Async action for fetching an array of page objects in a directory.

### `fetchPage(directory, filename)`

Async action for fetching the requested page in a directory.

### `putPage(mode, directory, filename)`

Async action for creating and updating the requested page.<br/>
The content comes from `state.metadata`. If the `path` is `nil`, it is auto-generated from the `title`.

`mode` may either be `create` or any other appropriate string (e.g. 'edit').

### `deletePage(directory, filename)`

Async action for deleting the requested page in a directory. After deletion, page list is requested.


## Collections

### `fetchCollections()`

Async action for fetching an array of the registered collections (including posts).

### `fetchCollection(collection_name, directory = '')`

Async action for fetching documents and directories of the requested collection
inside the requested directory.

### `fetchDocument(collection_name, directory, filename)`

Async action for fetching the requested document in a directory.
The response includes the document body.

### `putDocument(mode, collection_name, directory, filename = '')`

Async action for creating and updating the requested document. The content comes from `state.metadata`. If the filename is not provided, it is auto-generated from the title.
The response includes the document body.

`mode` may either be `publish`, or `create`, or any other appropriate string (e.g. 'edit').

`publish` - special `create` mode for converting a draft into a post.

### `deleteDocument(collection_name, directory, filename)`

Async action for deleting the document in a directory from disk. After deletion, collection documents are requested.


## Drafts

### fetchDrafts(directory = '')

Async action for fetching an array of drafts inside given subdirectory. Empty parameter returns drafts at the root of `_drafts/`

### fetchDraft(directory, filename)

Async action for fetching requested draft in a subdirectory

### putDraft(mode, directory, filename = '')

Async action for creating and updating a draft in a given subdirectory.<br/>
The content comes from `state.metadata`. If the `path` is `nil`, it is auto-generated from the `title`.

`mode` may either be `create` or any other appropriate string (e.g. 'edit').

### deleteDraft(directory, filename)

Async action for deleting the requested draft in a sub-directory. After deletion, drafts list is requested.


## Metadata

### `storeContentFields(meta)`

Action that puts the current document's meta in the redux store.

### `addField(namePrefix)`

Action that adds empty value to given path in metadata.

### `removeField(namePrefix, key)`

Action that removes the field with the given `key`. `key` can be object key or
array index.

### `updateFieldKey(namePrefix, fieldKey, newKey)`

Action that updates the key of the field with given path in metadata.

### `updateFieldValue(nameAttr, value)`

Action that updates the value of the field with given path in metadata.

### `moveArrayItem(namePrefix, srcInd, targetInd)`

Action that moves the array item of the field with given path in metadata
to the target index.

### `convertField(nameAttr, convertType)`

Action that converts the field to the given type.

### `updateTitle(title)`

Updates the content title when the input changes.

### `updateBody(body)`

Updates the content body when the markdown editor changes.

### `updateTemplate(prop, value)`

Updates the template state object. Currently used mainly to denote whether the template contains front matter dashes or not.

### `updatePath(path)`

Updates the content path when the input changes.


## Static Files

### `fetchStaticFiles(directory = '')`

Async action for fetching static files in a given directory.

### `uploadStaticFiles(directry, files)`

Async action for uploading multiple static files to the given directory at the same time.
It encodes the uploaded `File` objects to `base64` before sending PUT request.

### `deleteStaticFile(directory, filename)`

Async action for deleting the requested static file. After deletion, static file list is requested.


## Data Files

### `fetchDataFiles(directory = '')`

Async action for fetching data files in a directory.
`null` value for `directory` returns files in the configured data directory (`_data/` by default).

### `fetchDataFile(directory, filename)`

Async action for fetching the requested data file in a directory.

### `putDataFile(directory, filename, data, new_path = '', source = 'editor')`

Async action for creating and updating the requested data file in a directory. It validates the given filename and data before the PUT request.

Optional parameter `new_path` will update the data file's `path` metadata.
Optional parameter `source` can be set to `gui`, to create or update the requested file by parsing user input into valid YAML.

### `deleteDataFile(directory, filename)`

Async action for deleting the requested data file in a directory. After deletion, the root data file list is requested.

### `onDataFileChanged`

Action for keeping track of the updated form fields.


## Templates

Set of actions related to special directories (`_layouts`, `_includes`, `_sass` and `assets`), when they exist at the root of the site's source directory, and their contents.

### fetchTemplates(directory = '')

Async action for fetching an array of template files and sub-directories within given *template directory*.<br/>
Request with an empty parameter returns an array of available *template directories*.

### fetchTemplate(directory, filename)

Async action for fetching the requested template file in a subdirectory within a given template directory.

### putTemplate(mode, directory, filename = '', include_front_matter = true)

Async action for creating and updating the requested template file in a subdirectory with a given template directory.

`mode` may be either `create` or any other appropriate string (e.g. 'edit')<br/>
`include_front_matter` determines whether `front_matter` is included in the request or not.

### deleteTemplate(directory, filename)

Async action for deleting the requested template file in a subdirectory within a given template directory.


## Theme Gem

### `fetchTheme(directory = '')`

Async action for fetching theme files in a directory. <br/>
Empty parameter fetches the theme's metadata as well as a list of available directories.

### `fetchThemeItem(directory, filename)`

Async action for fetching the requested theme file in a directory.

### `putThemeItem(directory, filename, data)`

Async action for copying a theme-file to the same path relative to the site's source directory.


## Dashboard

### `fetchMeta()`
Async action that fetches a filtered aggregate of the current site's internal payload.


## Utils

### `search(input)`

Action for storing search input from the user

### `validationError(errors)`

Action for storing form errors.

### `clearErrors()`

Action for clearing form errors if any.


## Notifications

### `addNotification(title, message, level)`

Action for adding a notification
