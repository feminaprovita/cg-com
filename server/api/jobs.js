const router = require('express').Router()
const {
  Category,
  Job,
  Presentation,
  Project,
  Publication,
  Skill
} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allJobs = await Job.findAll({
      include: [
        {model: Category},
        {model: Presentation},
        {model: Project},
        {model: Publication},
        {model: Skill}
      ]
    })
    res.json(allJobs)
  } catch (err) {
    next(err)
  }
})

router.get('/:jobId', async (req, res, next) => {
  try {
    const oneJob = await Job.findById(req.params.jobId, {
      include: [
        {model: Category},
        {model: Presentation},
        {model: Project},
        {model: Publication},
        {model: Skill}
      ]
    })
    if (oneJob) res.json(oneJob)
    else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})
