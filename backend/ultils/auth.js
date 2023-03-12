const { sign } = require('jsonwebtoken');

const createToken = (type, user) =>
    sign(
        {
            userId: user._id,
            ...(type === 'refreshToken'
                ? { tokenVersion: user.tokenVersion }
                : {}),
        },
        type === 'accessToken'
            ? process.env.JWT_ACCESS_SECRET
            : process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: type === 'accessToken' ? process.env.JWT_ACCESS_EXPIRES : process.env.JWT_REFRESH_EXPIRES,
        }
    );

const sendRefreshToken = (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
    });
};

module.exports = {
    createToken,
    sendRefreshToken,
};
