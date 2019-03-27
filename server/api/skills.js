const router = require('express').Router()
const {
  Affiliation,
  Blog,
  Category,
  Job,
  Presentation,
  Project,
  Publication,
  Skill
} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allSkills = await Skill.findAll({
      include: [
        {model: Category},
        {model: Affiliation},
        {model: Blog},
        {model: Job},
        {model: Presentation},
        {model: Project},
        {model: Publication}
      ]
    })
    res.json(allSkills)
  } catch (err) {
    next(err)
  }
})

router.get('/:skillId', async (req, res, next) => {
  try {
    const oneSkill = await Skill.findById(req.params.skillId, {
      include: [
        {model: Category},
        {model: Affiliation},
        {model: Blog},
        {model: Job},
        {model: Presentation},
        {model: Project},
        {model: Publication}
      ]
    })
    if (oneSkill) res.json(oneSkill)
    else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})
