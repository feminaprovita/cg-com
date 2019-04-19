const Sequelize = require('sequelize')
const db = require('../db')

const Job = db.define('job', {
  company: {
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
  jobTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
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
    defaultValue: 'Present'
  },
  bullets: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  paragraph: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lectures: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  always: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  volunteer: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = Job
