const customAPIError=require('../errors/custom-error')

const authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new customAPIError(`This route is forbidden for the role ${roles}`,403)
        }
        next();
    }
}

module.exports=authorizeRoles