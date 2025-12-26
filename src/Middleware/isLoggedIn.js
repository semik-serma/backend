const isLoggedIn=(req,res,next)=>{
    try {
        const token=req.cookies
        
    } catch (error) {
        res.status(400).json({
            message:"error at middleware",
            error:error.message
        })
    }
}