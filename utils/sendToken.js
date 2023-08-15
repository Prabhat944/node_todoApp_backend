import jwt from "jsonwebtoken";

export const sendToken = (res,_id,message,statusCode=200,success=true,data) => {
    const token = jwt.sign({_id},process.env.SECRET_KEY);
    res.cookie('token',token,{
        httpOnly:true,
        maxAge:15*60*1000,
        secure:process.env.NODE_ENV === 'development' ? true : false,
        sameSite:process.env.NODE_ENV === 'development' ? 'lax' : 'none',
    }).status(statusCode).json({
        success,
        message,
        data,
        token
    })
}