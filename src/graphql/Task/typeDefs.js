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
`

module.exports = {
    Task
}
