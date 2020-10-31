const { Upload } = require('./Upload/resolvers')
const { User } = require('./User/resolvers')
const { Report } = require('./Report/resolvers')

const resolvers = [User, Upload, Report]

module.exports = { resolvers }
