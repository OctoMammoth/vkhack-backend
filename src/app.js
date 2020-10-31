const { PrismaClient } = require('@prisma/client')
const { GraphQLServer } = require('graphql-yoga')
const { typeDefs } = require('./graphql/typeDefs')
const { resolvers } = require('./graphql/resolvers')
const { checkRole } = require('./utils/auth')
require('dotenv').config()

const prisma = new PrismaClient()

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    // middlewares: [PrismaSelect],
    context: (req) => {
        const { authorization } = req.request.headers
        const access = async (...roles) => {
            const checks = await Promise.all(
                roles.map(async (role) => {
                    return await checkRole(authorization, role, prisma, false)
                })
            )
            const find = checks.find((object) => object)
            if (find) {
                return find
            } else {
                throw new Error('Not access')
            }
        }
        const checkToken = async () => {
            const roles = ['USER', 'ADMIN', 'EXPERT']
            const checks = await Promise.all(
                roles.map(async (role) => {
                    return await checkRole(authorization, role, prisma, false)
                })
            )
            const find = checks.find((object) => object)
            if (find) {
                return find
            } else {
                throw new Error('Not access')
            }
        }
        // const access = {
        //     user: (user) => checkRole(authorization, 'USER', prisma, true),
        //     or: async (...roles) => {
        //         const checks = await Promise.all(roles.map(async role => {
        //             return await checkRole(authorization, role, prisma, false)
        //         }));
        //         const find = checks.find(object => object);

        //         if (find) {
        //             return find
        //         } else {
        //             throw new Error('Not access')
        //         }
        //     }
        return {
            prisma,
            access,
            checkToken
        }
    }
})
const PORT = process.env.PORT || process.env.SERVER_PORT || 4000

server.start({ port: PORT }, () => {
    console.log(`Server is running on localhost:${PORT}`)
})
