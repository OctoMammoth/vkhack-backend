const { checkRole } = require('../../utils/auth')
// const { processUpload } = require('../../utils/upload')
const { PrismaSelect } = require('@paljs/plugins');

const Report = {
    Mutation: {
        reportUser: async (_parent, { data }, { prisma, checkToken }, info) => {
            const { reportedId } = data
            const reported = await prisma.user.findOne({ where: {id: reportedId} })
            if (!reported) throw new Error('Invalid reported user')
            const { id } = await checkToken()
            const args = {
                data: {
                    author: {
                        connect: {
                            id
                        }
                    },
                    reported: {
                        connect: {
                            id: reportedId
                        }
                    },
                    type: data.type,
                    description: data.description
                }
            }
            const select = new PrismaSelect(info).value;
            return prisma.report.create({...args, ...select})
        },
    },
    Query: {
        reports: async (_parent, {}, {prisma, access}, info) => {
            await access('admin')
            const select = new PrismaSelect(info).value;
            return prisma.report.findMany({...select})
        }
    }
}

module.exports = {
    Report
}
