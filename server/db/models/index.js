const Affiliation = require('./affiliation')
const Blog = require('./blog')
const Category = require('./category')
const Job = require('./job')
const Presentation = require('./presentation')
const Project = require('./Project')
const Publication = require('./Publication')
const School = require('./School')
const Skill = require('./Skill')

// categories
Affiliation.belongsTo(Category)
Category.hasMany(Affiliation)

Blog.belongsTo(Category)
Category.hasMany(Blog)

Job.belongsToMany(Category, {through: 'job_categories', unique: false})
Category.belongsToMany(Job, {through: 'job_categories', unique: false})

Presentation.belongsTo(Category)
Category.hasMany(Presentation)

Project.belongsToMany(Category, {through: 'project_categories', unique: false})
Category.belongsToMany(Project, {through: 'project_categories', unique: false})

Publication.belongsTo(Category)
Category.hasMany(Publication)

School.belongsTo(Category)
Category.hasMany(School)

Skill.belongsTo(Category)
Category.hasMany(Skill)

// affiliations
Job.belongsToMany(Affiliation, {through: 'job_affiliations', unique: false})
Affiliation.belongsToMany(Job, {through: 'job_affiliations', unique: false})

Affiliation.belongsToMany(Skill, {through: 'affiliation_skills', unique: false})
Skill.belongsToMany(Affiliation, {through: 'affiliation_skills', unique: false})

// blogs
Blog.belongsTo(Project)
Project.hasMany(Blog)

Blog.belongsToMany(Skill, {through: 'blog_skills', unique: false})
Skill.belongsToMany(Blog, {through: 'blog_skills', unique: false})

// jobs
Presentation.belongsTo(Job)
Job.hasMany(Presentation)

Project.belongsTo(Job)
Job.hasMany(Project)

Publication.belongsTo(Job)
Job.hasMany(Publication)

Job.belongsToMany(Skill, {through: 'job_skills', unique: false})
Skill.belongsToMany(Job, {through: 'job_skills', unique: false})

// presentations
Publication.belongsTo(Presentation)
Presentation.hasOne(Publication)

Presentation.belongsToMany(Skill, {
  through: 'presentation_skills',
  unique: false
})
Skill.belongsToMany(Presentation, {
  through: 'presentation_skills',
  unique: false
})

// projects
Project.belongsTo(School)
School.hasMany(Project)

Project.belongsToMany(Skill, {through: 'project_skills', unique: false})
Skill.belongsToMany(Project, {through: 'project_skills', unique: false})

// publications

Publication.belongsToMany(Skill, {through: 'publication_skills', unique: false})
Skill.belongsToMany(Publication, {through: 'publication_skills', unique: false})

module.exports = {
  Affiliation,
  Blog,
  Category,
  Job,
  Presentation,
  Project,
  Publication,
  School,
  Skill
}
