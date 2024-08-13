class apiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        error,
        stack
    ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error
        this.success = false
        this.data =  null;
        if(stack){
            Error.captureStackTrace(this, this.constructor)
        }
    }
}



export {apiError}