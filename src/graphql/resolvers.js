const { Upload } = require('./Upload/resolvers')
const { User } = require('./User/resolvers')
const { Report } = require('./Report/resolvers')
const { Course } = require('./Course/resolver')
const { Session } = require('./Session/resolvers')
const { Task } = require('./Task/resolvers')

const resolvers = [User, Upload, Report, Course, Session, Task]

module.exports = { resolvers }
