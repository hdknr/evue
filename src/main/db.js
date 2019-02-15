'use strict'
import {
  app
} from 'electron'
import path from 'path'
import Sequelize from 'sequelize'

// https://qiita.com/progre/items/2718f4ad20eecf27d599
// macOS - $HOME/Library/Application Support/{{ package name }}
// Windwos - %USERPROFILE%\AppData\Roaming\{{ package name }}
// pakcage name : run dev で 'Electron'
const _dbfile = path.join(app.getPath('userData'), 'evue.db')
const _backend = {dialect: 'sqlite', storage: _dbfile}
const models = {
  backend: new Sequelize('eveu', '', '', _backend)
}

models.Video = models.backend.define('video', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
})

models.backend.sync()

export default models
