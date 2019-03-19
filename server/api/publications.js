const router = require('express').Router()
const {
  Category,
  Job,
  Presentation,
  Publication,
  Skill
} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allPublications = await Publication.findAll({
      include: [
        {model: Category},
        {model: Job},
        {model: Presentation},
        {model: Skill}
      ]
    })
    res.json(allPublications)
  } catch (err) {
    next(err)
  }
})

router.get('/:publicationId', async (req, res, next) => {
  try {
    const onePublication = await Publication.findById(
      req.params.publicationId,
      {
        include: [
          {model: Category},
          {model: Job},
          {model: Presentation},
          {model: Skill}
        ]
      }
    )
    if (onePublication) res.json(onePublication)
    else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})
