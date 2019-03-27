const router = require('express').Router()
const {Affiliation, Category, Job, Skill} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allAffiliations = await Affiliation.findAll({
      include: [{model: Category}, {model: Job}, {model: Skill}]
    })
    res.json(allAffiliations)
  } catch (err) {
    next(err)
  }
})

router.get('/:affiliationId', async (req, res, next) => {
  try {
    const oneAffiliation = await Affiliation.findById(
      req.params.affiliationId,
      {
        include: [{model: Category}, {model: Job}, {model: Skill}]
      }
    )
    if (oneAffiliation) res.json(oneAffiliation)
    else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})
