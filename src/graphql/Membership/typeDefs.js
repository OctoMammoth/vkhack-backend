const { default: gql } = require('graphql-tag')

const Membership = gql`
    type Membership {
        id: String
        courseId: String
        course: Course
        userId: String
        user: User
    }
`

module.exports = {
    Membership
}
