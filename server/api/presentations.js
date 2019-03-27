const router = require('express').Router()
const {
  Category,
  Job,
  Presentation,
  Publication,
  Skill
} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allPresentations = await Presentation.findAll({
      include: [
        {model: Category},
        {model: Job},
        {model: Publication},
        {model: Skill}
      ]
    })
    res.json(allPresentations)
  } catch (err) {
    next(err)
  }
})

router.get('/:presentationId', async (req, res, next) => {
  try {
    const onePresentation = await Presentation.findById(
      req.params.presentationId,
      {
        include: [
          {model: Category},
          {model: Job},
          {model: Publication},
          {model: Skill}
        ]
      }
    )
    if (onePresentation) res.json(onePresentation)
    else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})
