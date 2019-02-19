# Nunjucks

- [Node.jsでNunjucksを設定する - Qiita](https://qiita.com/kayanonaka/items/d868f076a97c74b5fd5d)

~~~bash
$ npm install nunjucks --save
.
~~~

~~~js
'use strict'
import { app } from 'electron'
import express from 'express'
import nunjucks from 'nunjucks'
import path from 'path'

const _BASEDIR = (process.env.NODE_ENV !== 'development') ? path.dirname(app.getAppPath()) : __dirname
const templates = path.join(_BASEDIR, '/templates')

const server = express()

nunjucks.configure(templates, {
  autoscape: true,
  express: server
})

export async function initWebServer (mainWindow) {
  if (mainWindow) {
    server.set('view engine', 'html')
    server.get('/home', home)
    server.get('/', home)
    server.listen(_port, _ip)
  }
}
~~~
