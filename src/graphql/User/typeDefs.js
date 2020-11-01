const { default: gql } = require('graphql-tag')

const User = gql`
    type Query {
        user: User
        findUser(where: UserWhereInput!): UserPublic
        findUserAdmin(where: UserWhereInput!): User
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
        instagram: String
        courses: [Membership]
        myCourses: [Course]
        role: String!
    }

    type UserPublic {
        id: String
        login: String
        createdAt: String
        name: String
        surname: String
        patronymic: String
        role: String
        instagram: String
    }

    input UserWhereInput {
        login: String!
    }

    input RefreshUserInput {
        instagram: String
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
