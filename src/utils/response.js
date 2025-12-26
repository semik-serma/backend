export const successResponse = (res, message = 'success', data = {}, status = 200) => {
    return res.status(status).json({
        message,
        data
    });
};

export const errorResponse=(res,message='error',status=400,error={})=>{
    return res.status(status).json({
        message,
        error
    })
}