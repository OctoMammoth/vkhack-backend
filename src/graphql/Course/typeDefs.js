const { default: gql } = require('graphql-tag')

const Course = gql`
    type Course {
        id: String
        createdAt: String
        updateAt: String
        type: String
        startAt: String
        endAt: String
        author: User
        authorId: String
        members: [Membership]
        sessions: [Session]
    }
`

module.exports = {
    Course
}
