const { checkRole } = require('../../utils/auth')
// const { processUpload } = require('../../utils/upload')
const { PrismaSelect } = require('@paljs/plugins')

const Course = {
    Query: {
        joinCourse: async (_parent, args, { prisma, checkToken }, info) => {
            const { id } = checkToken()
            const { courseId } = args.where()
            const Course = prisma.course.findOne({ where: { id: courseId } })
            if (!Course) throw new Error('Invalid Course ID')
            const arg = {
                data: {
                    course: { connect: { id: courseId } },
                    user: { connect: { id } }
                }
            }
            const select = new PrismaSelect(info).value;
            return prisma.membership.create({...arg, ...select})
        }
    }
}

module.exports = {
    Course
}
