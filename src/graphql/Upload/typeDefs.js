const { default: gql } = require('graphql-tag')

const Upload = gql`
    scalar Upload
    
    input UploadInput {
        images: [Upload!]
    }

    type Mutation {
        uploadImages(data: UploadInput): [String!]!
    }
`

module.exports = {
    Upload
}
