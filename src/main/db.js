'use strict'
import { app } from 'electron'
import path from 'path'
import sqlite3 from 'sqlite3-offline'

// https://qiita.com/progre/items/2718f4ad20eecf27d599
const _dbfile = path.join(app.getPath('userData'), 'evue.db')

export async function initDatabase (mainWindow) {
  const db = new sqlite3.Database(_dbfile)

  db.serialize(function () {
    db.run('CREATE TABLE lorem (info TEXT)')

    const stmt = db.prepare('INSERT INTO lorem VALUES (?)')
    for (var i = 0; i < 10; i++) {
      stmt.run('Ipsum ' + i)
    }
    stmt.finalize()

    db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
      console.log(err)
      console.log(row.id + ': ' + row.info)
    })
  })
  db.close()
}

export default {
  initDatabase
}
