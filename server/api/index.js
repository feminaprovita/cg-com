const router = require('express').Router()
module.exports = router

router.use('/', require('./'))
router.use('/posts', require('./posts'))
router.use('/affiliations', require('./affiliations'))
router.use('/blogs', require('./blogs'))
router.use('/categories', require('./categories'))
router.use('/jobs', require('./jobs'))
router.use('/presentations', require('./presentations'))
router.use('/projects', require('./projects'))
router.use('/publications', require('./publications'))
router.use('/schools', require('./schools'))
router.use('/skills', require('./skills'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
