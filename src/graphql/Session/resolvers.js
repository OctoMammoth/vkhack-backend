const { PrismaSelect } = require('@paljs/plugins')
const moment = require('moment')

const Session = {
    Mutation: {
        createSession: async (_parent, args, { prisma, checkToken }, info) => {
            const { id } = await checkToken()
            const Course = await prisma.course.findOne({ where: args.where })
            if (!Course) throw new Error('Invalid course ID')
            if (id !== Course.authorId) throw new Error('You not owner of this Course')
            args.data.date = new Date(await moment(args.data.date).format( 'YYYY-MM-DD  HH:mm:ss.000' ));
            
            const createArgs = {
                data: {
                    course: {
                        connect: {
                            id: args.where.id
                        }
                    },
                    ...args.data
                }
            }

            const select = new PrismaSelect(info).value
            return prisma.session.create({...createArgs, ...select})
        },
        refreshSession: async (_parent, args, { prisma, checkToken }, info) => {
            const { id } = await checkToken()
            const Course = await prisma.course.findOne({ where: args.where })
            if (!Course) throw new Error('Invalid course ID')
            if (id !== Course.authorId) throw new Error('You not owner of this Course')
            args.data.date = new Date(await moment(args.data.date).format( 'YYYY-MM-DD  HH:mm:ss.000' ));
            
            const select = new PrismaSelect(info).value
            return prisma.session.update({...arg, ...select})
        },
        refreshSessionAdmin: async (_parent, args, { prisma, access }, info) => {
            await access()
            const Course = await prisma.course.findOne({ where: args.where })
            if (!Course) throw new Error('Invalid course ID')
            args.data.date = new Date(await moment(args.data.date).format( 'YYYY-MM-DD  HH:mm:ss.000' ));
            
            const select = new PrismaSelect(info).value
            return prisma.session.update({...arg, ...select})
        },
    }
}

module.exports = {
    Session
}
