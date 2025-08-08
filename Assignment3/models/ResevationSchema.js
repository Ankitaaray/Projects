const mongoose= require ('mongoose')
const ReservationSchema=({
    ResourceID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true
    }
})
module.exports=mongoose.model('Resevation', ReservationSchema);