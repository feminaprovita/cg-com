const Sequelize = require('sequelize')
const db = require('../db')

const School = db.define('school', {
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shortName: {
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
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  degree: {
    type: Sequelize.STRING
  },
  major: {
    type: Sequelize.STRING
  },
  graduation: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  thesis: {
    type: Sequelize.STRING
  },
  advisor: {
    type: Sequelize.STRING
  },
  detail: {
    type: Sequelize.TEXT
  }
})

module.exports = School
