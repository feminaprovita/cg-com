const router = require('express').Router()
const {Blog, Category, Job, Project, School, Skill} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allProjects = await Project.findAll({
      include: [
        {model: Category},
        {model: Job},
        {model: School},
        {model: Blog},
        {model: Skill}
      ]
    })
    res.json(allProjects)
  } catch (err) {
    next(err)
  }
})

router.get('/:projectId', async (req, res, next) => {
  try {
    const oneProject = await Project.findById(req.params.projectId, {
      include: [
        {model: Category},
        {model: Job},
        {model: School},
        {model: Blog},
        {model: Skill}
      ]
    })
    if (oneProject) res.json(oneProject)
    else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})
