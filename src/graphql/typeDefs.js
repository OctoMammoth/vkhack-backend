const { Upload } = require('./Upload/typeDefs')
const { User } = require('./User/typeDefs')
const { Report } = require('./Report/typeDefs')
const { Course } = require('./Course/typeDefs')
const { Membership } = require('./Membership/typeDefs')
const { Session } = require('./Session/typeDefs')
const { Task } = require('./Task/typeDefs')
const { mergeTypeDefs } = require('@graphql-tools/merge')
// const { sdlInputs } = require('@paljs/plugins')

const typeDefs = mergeTypeDefs([User, Upload, Report, Course, Membership, Session, Task])

module.exports = { typeDefs }
