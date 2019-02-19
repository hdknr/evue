'use strict'
import { app } from 'electron'
import express from 'express'
import nunjucks from 'nunjucks'
import path from 'path'
import orm from '../db'
import ip from 'ip'

const _port = 9001 // TODO: configuration
const _ip = '0.0.0.0' // TODO: configuration
const _BASEDIR = (process.env.NODE_ENV !== 'development') ? path.dirname(app.getAppPath()) : __dirname
const templates = path.join(_BASEDIR, '/templates')

const server = express()

nunjucks.configure(templates, {
  autoscape: true,
  express: server
})

async function home (req, res) {
  const context = {
    videos: await orm.Video.findAll()
  }
  return res.render('home/index', context)
}

export async function initWebServer (mainWindow) {
  console.log('IP address', ip.address())
  if (mainWindow) {
    // console.log(templates, __dirname)
    server.set('view engine', 'html')
    // server.set('views', templates)
    server.get('/home', home)
    server.get('/', home)
    server.listen(_port, _ip)
  }
}

export default {
  initWebServer
}
