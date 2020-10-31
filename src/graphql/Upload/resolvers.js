const { processUpload } = require ('../../utils/upload')

const Upload = {
    Mutation: {
        uploadImages: async (_parent, {data: {images}}, context) => {
            let uploads = []
            for (const item of images) {
                const image = await processUpload(item)
                uploads.push(image)
            }
            return uploads
        }
    }
}

module.exports = {
    Upload
}