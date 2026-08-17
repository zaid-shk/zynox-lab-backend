module.exports = {
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: "7d"
    }
};
