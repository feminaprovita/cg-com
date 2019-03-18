const Sequelize = require('sequelize')
const db = require('../db')

const Affiliation = db.define('affiliation', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
      notEmpty: true
    }
  },
  monthStart: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  monthEnd: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Present',
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Affiliation
