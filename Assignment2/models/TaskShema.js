const mongoose= require ('mongoose')
const TaskSchema=({
    name:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})
module.exports=mongoose.model('Task', TaskSchema);