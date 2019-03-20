const Sequelize = require('sequelize')
const db = require('../db')

const Publication = db.define('publication', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  book: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  footnote: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  summary: {
    type: Sequelize.TEXT
    // allowNull: false,
    // validate: {
    //   notEmpty: true
    // }
  },
  url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
      // notEmpty: true
    }
  },
  details: {
    type: Sequelize.TEXT
  }
})

module.exports = Publication
