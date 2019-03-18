const router = require('express').Router()
const Campuses = require('../db/models/campuses.models')
const Students = require('../db/models/students.models')

router.get('/:category', async (req, res, next) => {
  try {
    const allPosts = await Campuses.findAll({
      where: req.query,
      include: [Students]
    })
    res.json(allCampuses)
  } catch (err) {
    next(err)
  }
})

router.get('/:campusId', async (req, res, next) => {
  try {
    const chosenCampus = await Campuses.findById(req.params.campusId, {
      include: [Students]
    })
    if (chosenCampus) res.json(chosenCampus)
    else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})
