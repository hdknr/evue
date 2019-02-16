# express

## src/main/web

~~~bash
src/main/web/
├── index.js
└── templates
    └── home
        └── index.ejs
~~~

index.js - `_BASEDIR` を production と development で変える:

~~~js
'use strict'
import { app } from 'electron'
import express from 'express'
import path from 'path'
import orm from '../db'

const _port = 9900 // TODO: configuration
const _ip = '0.0.0.0' // TODO: configuration
const _BASEDIR = (process.env.NODE_ENV !== 'development') ? path.dirname(app.getAppPath()) : __dirname

const server = express()

async function home (req, res) {
  const context = {
    videos: await orm.Video.findAll()
  }
  return res.render('home/index', context)
}

export async function initWebServer (mainWindow) {
  if (mainWindow) {
    const templates = path.join(_BASEDIR, '/templates')
    console.log(templates, __dirname)
    server.set('view engine', 'ejs')
    server.set('views', templates)
    server.get('/home', home)
    server.get('/', home)
    server.listen(_port, _ip)
  }
}

export default {
  initWebServer
}

~~~

src/main/index.js - Electron のメインプロセスでinitWebServerの呼び出し:

~~~js

function createWindow () {
  mainWindow = new BrowserWindow({ height: 563, useContentSize: true, width: 1000 })
  mainWindow.loadURL(winURL)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  ...
  initWebServer(mainWindow)
  ...
}
~~~

packages.json - `extraResources` でリソースにテンプレートを追加する:

~~~json
{
  "name": "evue",
  ...
  "build": {
    "productName": "evue",
    ...
    "files": [
      "dist/electron/**/*"
    ],
    "extraResources": [{
      "from": "src/main/web",
      "to": ".",
      "filter": [
        "**/*",
        "!*.js"
      ]
    }],
    ...
  },

}
~~~