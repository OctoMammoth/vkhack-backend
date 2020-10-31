const jwt = require('jsonwebtoken');

const checkRole = async (authorization, role, prisma, require) => {
    if (!authorization) {
        throw new Error('Not access')
    }
    let error = false;
    const verify = await jwt.verify(
        authorization,
        process.env[`${role.toUpperCase()}_SECRET`],
        async (err, decoded) => {
            if (err) {
                if (require) {
                    throw new Error('Not access')
                } else {
                    error = true;
                    return null
                }
            }
            const user = await prisma.user.findOne({where: { id: decoded.id }})
            if (user.role === role.toUpperCase())
                return decoded
            else
                throw new Error ('Token timeout')
        }
    );

    if (error) return null;

    return verify
};

module.exports = {
    checkRole
};