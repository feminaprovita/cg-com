const Affiliation = require('./affiliation')
const Blog = require('./blog')
const Category = require('./category')
const Job = require('./job')
const Presentation = require('./presentation')
const Project = require('./project')
const Publication = require('./publication')
const School = require('./school')
const Skill = require('./skill')

// categories
Affiliation.belongsTo(Category)
Category.hasMany(Affiliation)

Blog.belongsTo(Category)
Category.hasMany(Blog)

Job.belongsToMany(Category, {through: 'job_categories'})
Category.belongsToMany(Job, {through: 'job_categories'})

Presentation.belongsTo(Category)
Category.hasMany(Presentation)

Project.belongsTo(Category)
Category.hasMany(Project)

Publication.belongsTo(Category)
Category.hasMany(Publication)

School.belongsTo(Category)
Category.hasMany(School)

Skill.belongsTo(Category)
Category.hasMany(Skill)

// affiliations
Job.belongsToMany(Affiliation, {through: 'job_affiliations'})
Affiliation.belongsToMany(Job, {through: 'job_affiliations'})

Affiliation.belongsToMany(Skill, {through: 'affiliation_skills'})
Skill.belongsToMany(Affiliation, {through: 'affiliation_skills'})

// blogs
Blog.belongsTo(Project)
Project.hasMany(Blog)

Blog.belongsToMany(Skill, {through: 'blog_skills'})
Skill.belongsToMany(Blog, {through: 'blog_skills'})

// jobs
Presentation.belongsTo(Job)
Job.hasMany(Presentation)

Publication.belongsTo(Job)
Job.hasMany(Publication)

Job.belongsToMany(Skill, {through: 'job_skills'})
Skill.belongsToMany(Job, {through: 'job_skills'})

// presentations
Publication.belongsTo(Presentation)
Presentation.hasOne(Publication)

Presentation.belongsToMany(Skill, {through: 'presentation_skills'})
Skill.belongsToMany(Presentation, {through: 'presentation_skills'})

// projects
Job.belongsTo(Project)
Project.hasMany(Job)

Project.belongsToMany(Skill, {through: 'project_skills'})
Skill.belongsToMany(Project, {through: 'project_skills'})

// publications
Publication.belongsToMany(Skill, {through: 'publication_skills'})
Skill.belongsToMany(Publication, {through: 'publication_skills'})

// schools
Project.belongsTo(School)
School.hasMany(Project)

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
