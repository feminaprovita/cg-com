const Sequelize = require('sequelize')
const db = require('../db')

const Presentation = db.define('presentation', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  org: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  location: {
    type: Sequelize.STRING
  },
  dateStart: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  dateEnd: {
    type: Sequelize.DATEONLY
  },
  details: {
    type: Sequelize.TEXT
  }
})

module.exports = Presentation
