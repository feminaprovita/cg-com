const Sequelize = require('sequelize')
const db = require('../db')

const Blog = db.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  postUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
      notEmpty: true
    }
  },
  date: {
    type: Sequelize.DATEONLY
  },
  summary: {
    type: Sequelize.STRING
  },
  teaser: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Blog
