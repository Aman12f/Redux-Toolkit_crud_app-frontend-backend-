const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    id:{
        type: String,
        required: true
      },
    name:{
        type: String,
        required: true
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      date:{
        type: Date,
        default:Date.now
      }
});

module.exports = mongoose.model('User',userSchema)
