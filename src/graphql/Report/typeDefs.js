const { default: gql } = require('graphql-tag')

const Report = gql`
    type Report {
        id: String
        createdAt: String
        type: String
        description: String
        author: User
        authorId: String
        reported: User
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
