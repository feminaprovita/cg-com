const router = require('express').Router()
const {Blog, Category, School} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allSchools = await School.findAll({
      include: [{model: Category}, {model: Blog}]
    })
    res.json(allSchools)
  } catch (err) {
    next(err)
  }
})

router.get('/:schoolId', async (req, res, next) => {
  try {
    const oneSchool = await School.findById(req.params.schoolId, {
      include: [{model: Category}, {model: Blog}]
    })
    if (oneSchool) res.json(oneSchool)
    else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})
