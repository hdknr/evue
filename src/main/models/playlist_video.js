import Sequelize from 'sequelize'

export default (orm) => {
  return orm.backend.define('playlistvideo', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    playlist_id: {
      type: Sequelize.INTEGER,
      references: {
        model: orm.Playlist,
        key: 'id', // This is the column name of the referenced model
        // This declares when to check the foreign key constraint. PostgreSQL only.
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    video_id: {
      type: Sequelize.INTEGER,
      references: {
        model: orm.Video,
        key: 'id', // This is the column name of the referenced model
        // This declares when to check the foreign key constraint. PostgreSQL only.
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  })
}
