import Sequelize from 'sequelize'

export default (orm) => {
  const _this = orm.backend.define('playlistvideo', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: Sequelize.STRING
  })

  orm.Video.belongsToMany(orm.Playlist, {through: _this})
  orm.Playlist.belongsToMany(orm.Video, {through: _this})

  return _this
}
