const { default: gql } = require('graphql-tag')

const Session = gql`
    type Session {
        id: String
        createdAt: String
        title: String
        updateAt: String
        date: DateTime
        isVisible: String
        courseId: String
        course: Course
        tasks: [Task]
    }

    type Mutation {
        createSession(data: SessionDataInput!, where: SessionWhereInput!): Session
        refreshSession(data: SessionUpdateDataInput!, where: SessionWhereInput!): Session
        refreshSessionAdmin(data: SessionUpdateDataInput!, where: SessionWhereInput!): Session
    }

    input SessionDataInput {
        title: String!
        date: String!
    }

    input SessionUpdateDataInput {
        title: String
        date: DateTime
    }

    input SessionWhereInput {
        id: String!
    }
`

module.exports = {
    Session
}
