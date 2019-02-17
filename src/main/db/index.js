'use strict'
import {
  app
} from 'electron'
import path from 'path'
import Sequelize from 'sequelize'
import * as Models from './models'

// userData:
// https://qiita.com/progre/items/2718f4ad20eecf27d599
// macOS - $HOME/Library/Application Support/{{ package name }}
// Windwos - %USERPROFILE%\AppData\Roaming\{{ package name }}
// pakcage name : run dev で 'Electron'
const _dbfile = app ? path.join(app.getPath('userData'), 'evue.db') : ':memory:'
const _backend = {dialect: 'sqlite', storage: _dbfile}
const orm = {
  backend: new Sequelize('eveu', '', '', _backend)
}

orm.Video = Models.Video(orm)
orm.Playlist = Models.Playlist(orm)
orm.PlaylistVideo = Models.PlaylistVideo(orm)

export default orm
