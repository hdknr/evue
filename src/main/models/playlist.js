import Sequelize from 'sequelize'

export default (orm) => {
  return orm.backend.define('playlist', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING
  })
}
