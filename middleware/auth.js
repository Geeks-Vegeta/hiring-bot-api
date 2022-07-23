


const requiredAuth=(req, res, next)=>{

    const auth = req.headers['authorization'];
    try {
        if(!auth) return res.json({"message":"UnAuthorised User"}).status(401);
        next();
        
    } catch (error) {
        console.log(error)
        
    }
    

}

module.exports=requiredAuth;