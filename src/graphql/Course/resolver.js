const { checkRole } = require('../../utils/auth')
// const { processUpload } = require('../../utils/upload')
const { PrismaSelect } = require('@paljs/plugins')
const moment = require('moment')

const Course = {
    Query: {
        joinCourse: async (_parent, args, { prisma, checkToken }, info) => {
            const { id } = await checkToken()
            const { courseId } = args.where
            const Course = await prisma.course.findOne({ where: { id: courseId } })
            if (!Course) throw new Error('Invalid Course ID')
            if (Course.status !== 'open') throw new Error('Course not open')
            const Membership = await prisma.membership.findMany({where: { courseId, userId: id}})
            if (Membership.length) throw new Error("You already in course")
            const arg = {
                data: {
                    course: { connect: { id: courseId } },
                    user: { connect: { id } }
                }
            }
            const select = new PrismaSelect(info).value
            return prisma.membership.create({ ...arg, ...select })
        },
        getCourse: async (_parent, { where }, { prisma }, info) => {
            const select = new PrismaSelect(info).value
            return prisma.course.findOne({where, ...select})
        },
        getCoursePrivate: async (_parent, { where }, { prisma, checkToken }, info) => {
            const { id } = checkToken()
            const Membership = await prisma.membership.findMany({ 
                where: { courseId: where.id, userId: id }
            }) 
            // console.log(Membership)
            if (!Membership.length) throw new Error('You are not member of this Course')
            const select = new PrismaSelect(info).value
            console.log(select)
            return prisma.course.findOne({where, ...select})
        },
        getCourses: async (_parent, { page }, { prisma }, info) => {
            if ( page <= 0 )
                page = 1
            const pageCount = await prisma.course.count({ 
                where: {
                    status: "open"
                } 
            })
            if (page > Math.ceil(pageCount/12)) throw new Error("Page limit")
            const select = new PrismaSelect(info).value
            return prisma.course.findMany({
                orderBy: [
                    {
                        startAt: 'desc'
                    }
                ], 
                where: {
                    status: "open"
                },
                ...select
            })
        },
        getCoursesPageCount: async (_parent, {}, { prisma }) => {
            return Math.ceil(await prisma.course.count({ 
                where: {
                    status: "open"
                }
            }))
        }
    },
    Mutation: {
        createCourse: async (_parent, args, { prisma, access }, info) => {
            // require('moment')().format('YYYY-MM-DD HH:mm:ss');
            args.data.startAt = new Date(await moment(args.data.startAt).format( 'YYYY-MM-DD  HH:mm:ss.000' ));
            args.data.endAt = new Date(await moment(args.data.endAt).format( 'YYYY-MM-DD  HH:mm:ss.000' ));
            // args.data.startAt = parseInt(args.data.startAt)
            // args.data.endAt = parseInt(args.data.endAt)
            const { id } = await access('expert')
            const createArgs = {
                data: {
                    ...args.data,
                    author: {
                        connect: {
                            id
                        }
                    }
                }
            }
            const select = new PrismaSelect(info).value
            return prisma.course.create({ ...createArgs, ...select })
        },
        refreshCourse: async (_parent, args, { prisma, checkToken }, info) => {
            const { id } = await checkToken()
            const Course = await prisma.course.findOne({ where: args.where })
            if (!Course) throw new Error('Invalid course ID')
            if (id !== Course.authorId) throw new Error('You not owner of this Course')
            args.data.startAt = new Date(await moment(args.data.startAt).format( 'YYYY-MM-DD  HH:mm:ss.000' ));
            args.data.endAt = new Date(await moment(args.data.endAt).format( 'YYYY-MM-DD  HH:mm:ss.000' ));
            const select = new PrismaSelect(info).value
            return prisma.course.update({ ...args, ...select })
        },
        refreshCourseAdmin: async (_parent, args, { prisma, checkToken }, info) => {
            //access already includes ADMIN role checker
            await access()
            const Course = await prisma.course.findOne({ where: args.where })
            if (!Course) throw new Error('Invalid course ID')
            args.data.startAt = new Date(await moment(args.data.startAt).format( 'YYYY-MM-DD  HH:mm:ss.000' ));
            args.data.endAt = new Date(await moment(args.data.endAt).format( 'YYYY-MM-DD  HH:mm:ss.000' )); 
            const select = new PrismaSelect(info).value
            return prisma.course.update({ ...args, ...select })
        }
    }
}

module.exports = {
    Course
}
