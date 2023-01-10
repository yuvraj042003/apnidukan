// CREATING A TOKEN AND SAVING IN COOKIE

const sendToken = (user,statusCode,res)=>{
    // Options for Cookie
    const token = user.getJWTToken();
    const options = {
        expire:new Date(
            Date.now+ process.env.COOKIE_EXIPRE *24*60*60*1000
        ),
        httpOnly:true
    };
    res.status(statusCode).cookie("token", token,options).json({
        sucess:true,
        user,
        token,
    });
};

module.exports = sendToken;