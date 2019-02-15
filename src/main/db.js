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

function initModels () {
  // http://docs.sequelizejs.com/
  const backend = new Sequelize(
    'eveu', '', '', {
      dialect: 'sqlite',
      storage: _dbfile
    })

  const Video = backend.define('video', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING
  })

  backend
    .sync()
    .then(() => {
      Video
        .create({
          name: 'your name'
        })
        .error((err) => {
          console.log(err)
        })
    })
}

export async function initDatabase (mainWindow) {
  initModels()
}

export default {
  initDatabase
}
