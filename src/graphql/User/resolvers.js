const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { PrismaSelect } = require('@paljs/plugins');

const User = {
    Query: {
        user: async (_parent, {} , { prisma, checkToken }, info) => {
            const { id } = await checkToken()
            const args = { where : { id }}
            const select = new PrismaSelect(info).value;
            return prisma.user.findOne({ ...args, ...select })
        },
        findUser: async (_parent, { where }, { prisma }, info ) => {
            const select = new PrismaSelect(info).value;
            return prisma.user.findOne({ where, ...select })
        },
        findUserAdmin: async (_parent, { where }, { prisma, access }, info ) => {
            await access()
            const select = new PrismaSelect(info).value;
            return prisma.user.findOne({ where, ...select })
        }
    },
    Mutation: {
        registerUser: async (_parent, { data }, { prisma }) => {
            const { password } = data
            passwordBcrypt = await bcrypt.hash(password, 10)
            data.password = passwordBcrypt
            const user = await prisma.user.create({ data })
            const token = jwt.sign({ id: user.id }, process.env[`USER_SECRET`])
            return {
                user,
                token
            }
        },
        authUser: async (_parent, { data }, { prisma }) => {
            const { password, login } = data
            const user = await prisma.user.findOne({ where: { login } })
            const compare = bcrypt.compareSync(password, user.password)
            if (!compare) throw new Error('Incorrect password')
            const token = await jwt.sign(
                { id: user.id },
                process.env[`${user.role.toUpperCase()}_SECRET`]
            )
            return {
                token,
                user
            }
        },
        refreshUser: async (_parent, { data }, { prisma, checkToken }) => {
            const { id } = await checkToken();
            await prisma.user.update({ where: { id }, data })
        }
    }
}

module.exports = {
    User
}
