const { default: gql } = require('graphql-tag')

const User = gql`
    type Query {
        user: User
    }

    type Mutation {
        registerUser(data: RegistrationUserInput!): AuthUserOutput
        authUser(data: AuthUserInput!): AuthUserOutput
        refreshUser(data: RefreshUserInput!): User
    }

    type User {
        id: String!
        createdAt: String!
        email: String!
        login: String!
        name: String
        surname: String
        patronymic: String
        reports: [Report]
        # courses: [Member]
        # myCourses: [Course]
        role: String!
    }

    input RefreshUserInput {
        name: String
        surname: String
        patronymic: String
    }

    input AuthUserInput {
        login: String!
        password: String!
    }

    input RegistrationUserInput {
        email: String!
        login: String!
        password: String!
        name: String
        surname: String
        patronymic: String
    }

    type AuthUserOutput {
        token: String!
        user: User!
    }
`

module.exports = {
    User
}
