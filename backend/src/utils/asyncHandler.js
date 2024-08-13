const asyncHandler = (asyncHandlerFunction)=>{
    return (req, res, next) =>{
        Promise.resolve(asyncHandlerFunction(req, res, next))
        .catch((error)=> next(error))
    }
}

export {asyncHandler}