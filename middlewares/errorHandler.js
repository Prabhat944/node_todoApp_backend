
class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}


export const nextErrorHandler = (err,req,res,next) => {
    const message = err.message || 'Internal server error';
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success:false,
        message
    })
}


export default ErrorHandler;