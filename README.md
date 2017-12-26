# Node JS starter web application

A todo web application built.

## Features incorporated
* Client side routing and rendering using window.history.popState
* Server side routing and rendering
* Reuse of templates/views on client and server side
* Creation of artifact that will append a hash to the javascript filename

## Tech Stack
* Node/Express JS
* handlebars
* Webpack
* Gulp for bursting cache of javascript using file content hash (this should be replaced with webpack)

## For Development

To start the dev environment run

`npm run start-dev`

and go to http://localhost:5000/

In dev mode, watch is enabled for both the client side and the server side.

## To create an artifact

`npm run create-artifact`

Artifact will be created in the dist directory. node_modules will not be copied. To copy node modules into the artifact directory you can use [this script](https://gist.github.com/arvsr1988/6979d5ff3fb526fc0455d9bba3d74453)
