const Affiliation = require('./affiliation')
const Blog = require('./blog')
const Category = require('./category')
const Job = require('./job')
const Presentation = require('./presentation')
const Project = require('./Project')
const Publication = require('./Publication')
const School = require('./School')
const Skill = require('./Skill')

Category.hasMany(Affiliation)
Category.hasMany(Blog)
Category.hasMany(Job)
Category.hasMany(Presentation)
Category.hasMany(Project)
Category.hasMany(Publication)
Category.hasMany(School)
Category.hasMany(Skill)

Affiliation.belongsTo(Category)

Blog.belongsTo(Category)
Blog.hasMany(Project) // might become many-many later (might need more fixing now)
Blog.hasMany(Skill)

Job.belongsToMany(Category, {through: 'JobCategories'})
Job.hasMany(Affiliation)
Job.hasMany(Presentation)
Job.hasMany(Project) // maybe flip
// Job.hasMany(Publication)
Job.hasMany(Skill)

Presentation.belongsTo(Category)
Presentation.belongsTo(Job)
Presentation.hasOne(Publication)
Presentation.hasMany(Skill)

Project.belongsTo(Category)
Project.belongsTo(Job) // maybe flip
Project.belongsTo(School)
Project.belongsTo(Blog) // might become many-many later
Project.hasMany(Skill)

Publication.belongsTo(Category)
Publication.belongsTo(Job)
Publication.belongsTo(Presentation)
Publication.hasMany(Skill)

School.belongsTo(Category)
School.hasMany(Project)

Skill.belongsTo(Category)
// Skill.belongsToMany(Blog)
// Skill.belongsToMany(Job)
// Skill.belongsToMany(Presentation)
// Skill.belongsToMany(Project)
// Skill.belongsToMany(Publication)

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
