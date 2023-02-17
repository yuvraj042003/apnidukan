// CREATING A TOKEN AND SAVING IN COOKIE

const sendToken = (user, statusCode, res) => {
    // Options for Cookie
    const token = user.getJWTToken();
    const options = {

        expires: process.env.COOKIE_EXIPRE,

        httpOnly: true
    };
    res.status(statusCode).cookie("token", token, options).json({
        sucess: true,
        user,
        token,
    });
};

module.exports = sendToken;