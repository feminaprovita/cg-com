const Affiliation = require('./Affiliation')
const Blog = require('./Blog')
const Category = require('./Category')
const Job = require('./Job')
const Presentation = require('./Presentation')
const Project = require('./Project')
const Publication = require('./Publication')
const School = require('./School')
const Skill = require('./Skill')

Affiliation.belongsTo(Category)
Affiliation.belongsTo(Job)

Blog.belongsTo(Category)
Blog.belongsToMany(Project)
Blog.hasMany(Skill)

Job.belongsTo(Category)
Job.hasMany(Presentation)
Job.hasMany(Project)
Job.hasMany(Publication)
Job.hasMany(Skill)

Presentation.belongsTo(Category)
Presentation.belongsTo(Job)
Presentation.belongsTo(Publication)
Presentation.hasMany(Skill)

Project.belongsTo(Category)
Project.belongsTo(Job)
Project.belongsTo(School)
Project.hasMany(Blog) //one-to-many
Project.hasMany(Skill)

Publication.belongsTo(Category)
Publication.belongsTo(Job)
Publication.belongsTo(Presentation)
Publication.hasMany(Skill)

School.belongsTo(Category)
School.hasMany(Blog)
School.hasMany(Project)

Skill.belongsTo(Category)
Skill.hasMany(Blog)
Skill.hasMany(Job)
Skill.hasMany(Presentation)
Skill.hasMany(Project)
Skill.hasMany(Publication)

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
