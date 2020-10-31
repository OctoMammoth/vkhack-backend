const { default: gql } = require('graphql-tag')

const Session = gql`
    type Session {
        id: String
        createdAt: String
        updateAt: String
        date: String
        isVisible: String
        courseId: String
        course: Course
        tasks: [Task]
    }
`

module.exports = {
    Session
}
