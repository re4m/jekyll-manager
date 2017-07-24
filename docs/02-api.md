---
title: API
permalink: /api/
---

The following are the various endpoints of the shared HTTP API. All requests and responses are made in JSON, and follows RESTful standards, including respecting HTTP verbs.

For simplicity, whenever possible, the API mirrors Jekyll internal data structures, meaning, objects are generally the results of calling `.to_liquid.to_json` on an existing Jekyll model (and the resulting fields).

The API is exposed as `http://localhost:4000/_api` (or whatever server/port your Jekyll installation is running on).

> **Note: Prior to version 1.0.0, the HTTP API is to be considered a pre-release API, and is subject to breaking changes without notice. You're welcome (and are encouraged) to build external tools or apps against this API, but as the API is refined and finalized, it may not strictly follow [Semantic Versioning](http://semver.org/) standards.**

<br>

## Introduction

### Pages and Documents

Pages and documents are JSON objects resulting from calling `to_liquid.to_json` on the underlying Jekyll object.

The resulting JSON object has the following structure:

* Top level keys are keys with special meaning. This includes:
  * Computed, read-only keys like `url`
  * Computed, read/write keys like `path`
  * Front matter defaults
* The top-level namespace will have `content` and `raw_content` keys with the HTML and markdown respectively
* The top-level namespace will have a `front_matter` key which includes the raw front matter as seen on disk.

A standard page may then look like this:

```json
{
  "all": true,
  "page_only": true,
  "foo": "bar",
  "content": "<h1 id=\"test-page\">Test Page</h1>\n",
  "dir": "/",
  "name": "page.md",
  "path": "page.md",
  "url": "/page.html",
  "http_url": "http://localhost:4000/page.html",
  "api_url": "http://localhost:4000/_api/pages/page.md",
  "raw_content": "# Test Page\n",
  "front_matter": {
    "foo": "bar"
  }
}
```

When making a request, clients can set the following top-level fields:

* `raw_content` - the raw, unrendered content to be written to disk
* `front_matter` - the entire YAML front matter object to be written to disk
* `path` - the new file path relative to the site source, if the file is to be renamed

### Pages & Documents in subdirectories

In order to determine which pages and documents are in which subdirectories, API looks for
the project's file structure and lists all files and directories at a given path together.
Directories are represented as JSON objects resulting from calling
`JekyllAdmin::Directory.new`. The resulting JSON objects then merged with
pages/documents at the same level to be served in index endpoints.

A standard JSON object of a directory looks like this:

```json
{
  "name": "page-dir",
  "modified_time": "2017-07-12 11:18:23 +0200",
  "path": "page-dir",
  "type": "directory",
  "http_url": null,
  "api_url": "http://localhost:4000/_api/pages/page-dir"
}
```


### Data files and the config file

The Configuration API is a direct JSON representation of the underlying config file.
A JSON object from data files and the config file has the data typically segregated into two representations:

* `content` - the parsed configuration data as read by Jekyll.
* `raw_content` - the raw data as it sits on the disk.

### Data files in subdirectories

Like Pages and Documents, Data files in subdirectories too can be requested for. The resulting JSON object is very similar to the that derived from Pages and Documents.

A JSON object from a Data file subdirectory looks like this:

```json
{
  "name": "books",
  "modified_time": "2017-04-22 10:16:40 +0200",
  "path": "books",
  "type": "directory",
  "http_url": null,
  "api_url": "http://localhost:4000/_api/data/books/"
}
```

A `GET` call to the `api_url` will return another JSON object for the constituents of the directory:

```json
[
  {
    "name": "genres",
    "modified_time": "2017-04-22 10:07:10 +0200",
    "path": "books/genres",
    "type": "directory",
    "http_url": null,
    "api_url": "http://localhost:4000/_api/data/books/genres/"
  },
  {
    "path": "/_data/books/authors.yml",
    "relative_path": "books/authors.yml",
    "slug": "authors",
    "ext": ".yml",
    "title": "Authors",
    "http_url": null,
    "api_url": "http://localhost:4000/_api/data/books/authors.yml"
  }
]
```


### Static files

Static files are non-Jekyll files and may be binary or text.



## Collections

### Parameters

* `collection_name` - the name of the collection, e.g., posts (`String`)
* `path` - ***optional*** - the filename of a document, relative to the collection root (e.g., `2016-01-01-some-post.md` or `rover.md`) (`String`)
  * `directory` - ***optional*** - string path between root and file.
  * `filename` - ***optional*** - the document file name.
* `raw_content` - the document body (`String`)
* `front_matter` - the document's YAML front matter (`Object`)

### `GET /collections/`

Returns an array of the registered collections.

### `GET /collections/:collection_name`

Returns information about the requested collection.

### `GET /collections/:collection_name/entries/:directory/:filename`

Returns an array of documents and directories for the requested path.
The response does not include documents' body.

### `GET /collections/:collection_name/:directory/:filename`

Returns the requested document. The response includes the document body.

### `PUT /collections/:collection_name/:directory/:filename`

Create or update the requested document, writing its contents to disk.

### `DELETE /collections/:collection_name/:directory/:filename`

Delete the requested document from disk.


## Pages

### Parameters

* `path` - ***optional*** - The file's path, relative to the site root (e.g., `about.html`) (`String`)
  * `directory` - ***optional*** - string path between root and file.
  * `filename` - ***optional*** - the page file name.
* `raw_content` - the page's body (`String`)
* `front_matter` - the page's YAML front matter (`Object`)

### `GET /pages/:directory`

Returns an array of pages and subdirectories for the requested directory. If `:directory` is not provided, entries at the root level are returned. The response does not include pages' body.

### `GET /pages/:directory/:filename

Returns the requested page. The response includes the page body. `path` is optional.

### `PUT /pages/:directory/:filename`

Create or update the requested page, writing its contents to disk.

### `DELETE /pages/:directory/:filename`

Delete the requested page from disk.


## Configuration

### `GET /configuration`

Returns a hash object comprised of the parsed configuration from the file and the raw unparsed content of the file.

### `PUT /configuration`

Create or update the site's `_config.yml` file with the requested raw file content string.

File will be written to disk verbatim, preserving whitespace and inline comments.


## Static files

### Example responses

```json
{
  "name": "assets",
  "modified_time": "2017-07-07 10:48:30 +0200",
  "path": "assets",
  "type": "directory",
  "http_url": null,
  "api_url": "http://localhost:4000/_api/static_files/assets"
}
```
```json
{
  "name": "static-file.txt",
  "path": "/static-file.txt",
  "basename": "static-file",
  "extname": ".txt",
  "collection": null,
  "modified_time": "2017-07-06 21:59:24 +0200",
  "http_url": "http://localhost:4000/static-file.txt",
  "api_url": "http://localhost:4000/_api/static_files/static-file.txt",
  "encoded_content": "VEVTVAo=\n",
  "from_theme": false
}
```

> **Note**: The `encoded_content` field is the Base64 encoded representation of the file's content.

### Parameters

* `path` - ***optional*** - the path to the file or directory, relative to the site root (`String`)
  * `directory` - ***optional*** - string path to file.
  * `filename` - ***optional*** - the static file name.
* `raw_content` - The raw, text-based content to be written directly to disk (`String`)
* `encoded_content` - The Base64 encoded text or binary content (`String`)

### `GET /static_files/index`

Returns the list of all static files in the site's payload, including files, images from a theme-gem.

### `GET /static_files/:directory/:filename`

Returns the requested static file.

If the path maps to a directory, it list all static files in the directory. This does not include Documents or Pages.
A call without any parameters returns an array of static files and directories containing static files, at the site's root.

### `PUT /static_files/:directory/:filename`

Create or update a static file on disk. This can be an arbitrary ASCII or a binary file (e.g., an image).

### `DELETE /static_files/:directory/:filename`

Delete a static file from disk.


## Data files

### Payload

A standard data payload may look like:

```json
{
  "path": "/_data/data_file.yml",
  "relative_path": "data_file.yml",
  "slug": "data_file",
  "ext": ".yml",
  "title": "Data File",
  "http_url": null,
  "api_url": "http://localhost:4000/_api/data/data_file.yml",
  "content": {
    "foo": "bar"
  },
  "raw_content": "foo: bar\n"
}
```

### Parameters

* `path` - ***optional*** - File path relative to the site root (`String`).
  * `directory` - ***optional*** - string path between `data_dir` (default: `_data`) and file.
  * `filename` - ***optional*** - the data file name.
* `content` - The JSON encoded YAML object to write to disk as the file's content
* `raw_content` - The raw string representing the file's content to write to disk

### `GET /data/:directory/:filename`

If the path points to a directory, returns an array of directory contents. Does not include the file contents of the entries.
Otherwise, returns the requested data file with separate fields for raw contents and the parsed contents

### `PUT /data/:directory/:filename`

Create or update the requested data file with the requested contents.

File will be written to disk in YAML. It will necessarily preserve whitespace or in-line comments.

### `DELETE /data/:directory/:filename`

Remove the requested data file from disk.


## Drafts

### Example Response

The JSON objects for drafts closely resemble those off documents just that the files are relative to the `_drafts` dir.

Response for a `GET` call to a subdirectory `_drafts/draft-dir`:

```json
[
  {
    "name": "draft-dir",
    "modified_time": "2017-07-09 21:24:23 +0200",
    "path": "draft-dir",
    "type": "directory",
    "http_url": null,
    "api_url": "http://localhost:4000/_api/drafts/draft-dir"
  },
  {
    "path": "_drafts/draft-post.md",
    "id": "/2017/07/07/draft-post",
    "url": "/2017/07/07/draft-post.html",
    "relative_path": "draft-post.md",
    "collection": "posts",
    "draft": true,
    "categories": [],
    "all": true,
    "foo": "bar",
    "title": "Draft Post",
    "slug": "draft-post",
    "ext": ".md",
    "tags": [],
    "date": "2017-07-07 10:48:30 +0200",
    "http_url": "http://localhost:4000/2017/07/07/draft-post.html",
    "api_url": "http://localhost:4000/_api/drafts/draft-post.md",
    "name": "draft-post.md",
    "modified_time": "2017-07-07 10:48:30 +0200"
  }
]
```
Response for a call to a draft:

```json
{
  "next": {...},
  "previous": {...},
  "path": "_drafts/draft-post.md",
  "content": "<h1 id=\"draft-post\">Draft Post</h1>\n",
  "id": "/2017/07/07/draft-post",
  "url": "/2017/07/07/draft-post.html",
  "relative_path": "draft-post.md",
  "collection": "posts",
  "excerpt": "<h1 id=\"draft-post\">Draft Post</h1>\n",
  "draft": true,
  "categories": [],
  "foo": "bar",
  "title": "Draft Post",
  "slug": "draft-post",
  "ext": ".md",
  "tags": [],
  "date": "2017-07-07 10:48:30 +0200",
  "http_url": "http://localhost:4000/2017/07/07/draft-post.html",
  "api_url": "http://localhost:4000/_api/drafts/draft-post.md",
  "raw_content": "# Draft Post\n",
  "front_matter": {
    "foo": "bar"
  },
  "name": "draft-post.md",
  "modified_time": "2017-07-07 10:48:30 +0200"
}
```

### Parameters

* `path` - ***optional*** - The file's path, relative to the site root (e.g., `_drafts/draft-post.md`) (`String`)
  * `directory` - ***optional*** - string path between `_draft` and file.
  * `filename` - ***optional*** - the draft file name.
* `raw_content` - the draft's body (`String`)
* `front_matter` - the draft's YAML front matter (`Object`)

### `GET /drafts/:directory`

Returns an array of drafts and directories for the requested path. If `path` is not provided, entries at the root level are returned. The response does not include the draft's body.

### `GET /drafts/:directory/:filename`

Returns the requested draft. The response includes the draft body. `path` is optional.

### `PUT /drafts/:directory/:filename`

Create or update the requested draft, writing its contents to disk.

### `DELETE /drafts/:directory/:filename`

Delete the requested draft from disk.


## Templates

Templates refer to files and directories within the special Jekyll directories that house presentational data viz. `_layouts`, `_includes`, `_sass` and `assets`.

### Example Response

The JSON objects for templates are of three different types.<br>
If the request doesn't include a parameter, it returns an array of directory objects, one each for the folders above (if they exist at the root of the site's source directory). The other two closely resemble the responses for Pages.

Sample response for a bare `GET` call:

```json
[
  {
    "name": "_layouts",
    "modified_time": "2017-07-10 09:43:12 +0200",
    "path": "_layouts",
    "type": "directory",
    "http_url": null,
    "api_url": "http://localhost:4000/_api/templates/_layouts"
  },
  {
    "name": "_sass",
    "modified_time": "2017-07-10 15:07:49 +0200",
    "path": "_sass",
    "type": "directory",
    "http_url": null,
    "api_url": "http://localhost:4000/_api/templates/_sass"
  }
]
```
Response for a call to the `_layouts` directory:

```json
[
  {
    "name": "default.html",
    "path": "default.html",
    "http_url": null,
    "api_url": "http://localhost:4000/_api/templates/_layouts/default.html"
  },
  {
    "name": "page.html",
    "path": "page.html",
    "http_url": null,
    "api_url": "http://localhost:4000/_api/templates/_layouts/page.html"
  }
]
```
Response for a single *layout*:

```json
{
  "name": "default.html",
  "path": "_layouts/default.html",
  "http_url": null,
  "api_url": "http://localhost:4000/_api/templates/_layouts/default.html",
  "has_front_matter": false,
  "front_matter": {},
  "raw_content": "{% raw %}{{ content }}{% endraw %}\n"
}
```

### Parameters

* `path` - ***optional*** - The file's path, relative to the site root (e.g. `_layouts/default.html`) (`String`)
  * `directory` - ***optional*** - string path *containing* `[template_directory]` and any subdirectories.
  * `filename` - ***optional*** - the template file name.
* `raw_content` - the templates's body (`String`)
* `has_front_matter` - Whether the template contains front matter dashes or not. (e.g. `_layouts/default.html` and `_layouts/page.html`) (`Boolean`)
* `front_matter` - the template's YAML front matter (`Object`)

### `GET /templates/`

Returns an array of directory objects that point to either of `_layouts`, `_includes`, `_sass`, and `assets`, if the directory exists at the root of the site's source directory.

> **Note:** the `:directory` parameter in the calls below indicate one of the base template directory (and its optional subdirectories).

### `GET /templates/:directory`

Returns the requested template directory or subdirectory.

### `GET /templates/:directory/:filename`

Returns the requested template. The response includes the template body

### `PUT /templates/:directory/:filename`

Create or update the requested template, writing its contents to disk.

### `DELETE /templates/:directory/:filename`

Delete the requested template from disk.


## Theme Gem

A set of calls to related to data from the theme-gem currently in use.

### Parameters

* `path` - ***optional*** - path to theme-file relative to *theme-root* (`String`)
  * `directory` - ***optional*** - the string path between *theme-root* and file.
  * `filename` - ***optional*** - the file name.
* `raw_content` - the theme-file's body (`String`)

### `GET /theme`

Returns a *Manifest* of sorts for the current theme. Contains meta-information about the theme and array of `template_directory` objects.

### `GET /theme/:directory/:filename`

Returns the contents of the theme-gem. Files without an extension are currently rejected.

### `PUT /theme/:directory/:filename`

Create a copy of the requested template, writing its contents to disk, **relative to the site's source directory**


## Dashboard

### `GET /dashboard`

Returns a filtered JSON object from the site's cummulative payload for easy inspection.
