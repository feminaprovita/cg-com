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
    const allCategories = await Category.findAll({
      include: [
        {model: Affiliation},
        {model: Blog},
        {model: Job}, // M:M
        {model: Presentation},
        {model: Project},
        {model: Publication},
        {model: School},
        {model: Skill}
      ]
    })
    res.json(allCategories)
  } catch (err) {
    next(err)
  }
})

router.get('/:categoryId', async (req, res, next) => {
  try {
    const oneCategory = await Category.findOne({
      where: {
        id: req.params.categoryId
        // include: [
        //   {model: Affiliation},
        //   {model: Blog},
        //   {model: Job}, // M:M
        //   {model: Presentation},
        //   {model: Project},
        //   {model: Publication},
        //   {model: School},
        //   {model: Skill}
        // ]
      }
    })

    if (oneCategory) res.json(oneCategory)
    else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})
