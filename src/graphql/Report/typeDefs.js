const { default: gql } = require('graphql-tag')

const Report = gql`
    type Report {
        id: String
        createdAt: String
        type: String
        description: String
        author: UserPublic
        authorId: String
        reported: UserPublic
        reportedId: String
    }

    input reportInput{
        type: String
        description: String
        reportedId: String
    }

    type Mutation {
        reportUser(data: reportInput):Report
    }
    type Query {
        reports: [Report]
    }
`

module.exports = {
    Report
}
