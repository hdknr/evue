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
