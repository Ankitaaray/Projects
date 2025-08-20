const profile= async(req,res)=>{
    // const user=req.user
    res.status(200).json(req.user)
}
module.exports=profile