const router = require('express').Router()
const {
  Affiliation,
  Blog,
  Category,
  Job,
  Presentation,
  Project,
  Publication,
  School,
  Skill
} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allPosts = await Post.findAll({
      include: [{model: Category}, {model: Skill}]
    })
    res.json(allPosts)
  } catch (err) {
    next(err)
  }
})

router.get('/:postId', async (req, res, next) => {
  try {
    const onePost = await Post.findById(req.params.postId, {
      include: [{model: Category}, {model: Skill}]
    })
    if (onePost) res.json(onePost)
    else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})
