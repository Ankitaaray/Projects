const mongoose= require ('mongoose')
const ResourceSchema=({
    name:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Resource', ResourceSchema);