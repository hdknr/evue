'use strict'
import sqlite3 from 'sqlite3-offline'

export async function initDatabase (mainWindow) {
  var db = new sqlite3.Database(':memory:')

  db.serialize(function () {
    db.run('CREATE TABLE lorem (info TEXT)')

    var stmt = db.prepare('INSERT INTO lorem VALUES (?)')
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
