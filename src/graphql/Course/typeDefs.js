const { default: gql } = require('graphql-tag')

const Course = gql`
    scalar DateTime
    type Course {
        id: String
        createdAt: DateTime
        updateAt: DateTime
        title: String
        description: String
        type: String
        startAt: DateTime
        status: String
        endAt: DateTime
        author: UserPublic
        authorId: String
        members: [Membership]
        sessions: [Session]
    }

    type CoursePublic {
        id: String
        title: String
        description: String
        status: String
        type: String
        startAt: DateTime
        endAt: DateTime
        author: UserPublic
        authorId: String
    }

    type Mutation {
        createCourse(data: CourseDataInput!): Course
        refreshCourse(data: CourseRefreshInput!, where: CourseWhereInput!): Course
        refreshCourseAdmin(data: CourseRefreshInput!, where: CourseWhereInput!): Course
    }

    type Query {
        joinCourse(where: CourseJoinInput!): Membership
        getCoursePrivate(where: CourseWhereInput): Course
        getCourse(where: CourseWhereInput!): CoursePublic
        getCourses(page: Int): [CoursePublic]
        getCoursesPageCount:Int
    }

    input CourseRefreshInput {
        type: String
        title: String
        status: StatusEnum
        description: String
        startAt: DateTime
        endAt: DateTime
    }

    input CourseWhereInput {
        id: String!
    }

    input CourseDataInput {
        type: String!
        title: String!
        description: String!
        startAt: DateTime!
        endAt: DateTime!
    }

    input CourseJoinInput {
        courseId: String!
    }

    enum StatusEnum {
        invisible
        open
        running
        end
    }

`

module.exports = {
    Course
}
