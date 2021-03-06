# ShortStack

An experimental project architecture to provide dynamic client-side rendering with Javascript and server-rendered views all from the same content API and a simple templated static site generator.

The intention is to make the stack of technologies needed for sites that feel "dynamic" a bit shorter.


## Project goals

This project aims to provide a site development architecture which enables:

- Template driven static site generation
- Client-side dynamic pages as a progressive enhancement to static pages
- A URL for every page of content
- Zero server side logic required for its webserver
- Deployable to any static site server
- Decoupled and customizable content source
- Local caching of managed content for dependency free development process
- Support for atomic design development patterns
- Parity between local development and hosted production output

### Additional goals

- automation of deployment to S3



## Prerequisites

- node
- npm


## Installation

Clone the repo and in the project root install dependencies with:

`npm install`


## Building

Building outputs a static site to the `/dist` folder.

Build the entire project by using npm with the command `npm run build`, this also populates the local content API from the cloud CMS and purges the `/dist` folder.

More granular build control is available via:
- `npm run build:api` to source the content from the cloud CMS and create a local cache of content APIs to build from
- `npm run build:local` to compile the following build tasks based on the cached content api
  - `npm run build:html` to compile the static html files
  - `npm run build:js` to compile the javascript and dotjs templates for client-side rendering
  - `npm run build:css` to compile the stylus files into css


## Content API

Content for use in the templates is intended to be made available to:

1. The templates which render the static pages in the server.
2. The browser for inclusion in the site via javascript rendering client-side.

The content is sourced from an online CMS (http://contentful.com) and stored as a local API for more efficient development and also as a cached content API at runtime.

Populate the local API with `npm run build:api`


## Serving

After building the site, `npm run serve` will run a static web server exposing the contents of the `/dist` output folder.

------

## To do

- add support for linked data in content model
- add support of rendering markdown
- add a simple data flow diagram to the readme
- create content cache API to make it easier to build sites with different data models
- document the development approach
- build image asset pipeline
- automate deployments to S3





