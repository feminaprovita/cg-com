const router = require('express').Router()
const {Blog, Category, Project, Skill} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allBlogs = await Blog.findAll({
      include: [{model: Category}, {model: Project}, {model: Skill}]
    })
    res.json(allBlogs)
  } catch (err) {
    next(err)
  }
})

router.get('/:blogId', async (req, res, next) => {
  try {
    const oneBlog = await Blog.findById(req.params.blogId, {
      include: [{model: Category}, {model: Project}, {model: Skill}]
    })
    if (oneBlog) res.json(oneBlog)
    else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})
