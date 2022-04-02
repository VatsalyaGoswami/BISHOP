import mongoose  from "mongoose";

const connectDB=async ()=>{
  
    try{
const connect= await mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
 
})
console.log(`Mongodb connected:${connect.connection.host}`)
    }
    catch(error)
    {
        console.error(`Error:${error.message}`)
  process.exit();
    }
}
export default connectDB;