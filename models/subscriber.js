const mongoose = require('mongoose');

const subsciberSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    subscribedToChannel:{
        type : String,
        required : true
    },
    subscribeDate:{
        type : Date,
        retuired : true,
        default : Date.now
    }
})

module.exports = mongoose.model('Subscriber',subsciberSchema);