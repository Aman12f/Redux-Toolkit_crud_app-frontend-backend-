
const mongoose = require('mongoose');
const mongoUri = "mongodb://localhost:27017/redux_toolkit_crud_app"

const connectToMongoose =async()=>{
    try {
        await mongoose.connect(mongoUri);
        console.log("connected to mongo successfully");
    } catch (error) {
        console.error({msg:"Error connecting to mongo",error:error})
    }
}
module.exports = connectToMongoose;