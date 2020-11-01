const { default: gql } = require('graphql-tag')

const Task = gql`
    type Task {
        id: String
        type: String
        url: String
        video: String
        title: String
        complete: [TaskComplete]
    }
    
    type TaskComplete {
        id: String
        urlType: String
        url: String
        taskId: String
        task: Task
        memberId: String
        member: User
    }

    type Mutation {
        createTask(data: TaskDataInput!, where: TaskWhereInput!): Task
        refreshTask(data: TaskUpdateDataInput!, where: TaskWhereInput!): Task
        refreshTaskAdmin(data: TaskUpdateDataInput!, where: TaskWhereInput!): Task
    }

    input TaskUpdateDataInput {
        type: TaskType
        url: String
        video: String
        title: String
        description: String
    }

    input TaskDataInput {
        type: TaskType!
        url: String
        video: String
        title: String!
        description: String
    }

    input TaskWhereInput {
        id: String
    }

    enum TaskType {
        todo
        video
        url
    }
`

module.exports = {
    Task
}
