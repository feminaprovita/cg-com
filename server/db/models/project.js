const Sequelize = require('sequelize')
const db = require('../db')

const Project = db.define('project', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  paragraph: {
    type: Sequelize.TEXT
  },
  bullets: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  github: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
      notEmpty: true
    }
  },
  video: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  other: {
    type: Sequelize.STRING
  }
})

module.exports = Project
