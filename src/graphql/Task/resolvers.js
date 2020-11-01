const { PrismaSelect } = require('@paljs/plugins')
const { Course } = require('../Course/resolver')
const { Task } = require('./typeDefs')

const Session = {
    Mutation: {
        createTask: async (_parents, args, { prisma, checkToken}, info) => {
            const { id } = await checkToken()
            const Session = await prisma.session.findOne({ 
                where: args.where, 
                select: {
                    id: true,
                    course: {
                        include: {
                            authorId: true
                        }
                    }
                }
            })
            if (!Session) throw new Error('Invalid Session ID')
            if (id !== Session.course.authorId) throw new Error('You not owner of this Course')
            const select = new PrismaSelect(info).value
            return prisma.task.create({data: { ...args.data }, ...select})
        },
        refreshTask: async (_parent, args, { prisma, checkToken }, info) => {
            const { id } = await checkToken()
            const Task = await prisma.task.findOne({ 
                where: args.where, 
                select: {
                    id: true,
                    session: {
                        include: {
                            course: {
                                include: {
                                    authorId: true
                                }
                            }
                        }
                    }
                }
            })
            if (!Task) throw new Error('Invalid Task ID')
            if (id !== Task.session.course.authorId) throw new Error('You not owner of this Course')
            const select = new PrismaSelect(info).value
            return prisma.task.update({...arg, ...select})
        },
        refreshTaskAdmin: async (_parent, args, { prisma, access }, info) => {
            await access()
            const Task = await prisma.task.findOne({ where: { ...args.where }})
            if (!Task) throw new Error('Invalid Task ID')
            const select = new PrismaSelect(info).value
            return prisma.task.update({...arg, ...select})
        }
    }
}

module.exports = {
    Session
}