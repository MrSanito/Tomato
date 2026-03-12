import mongoose from "mongoose"

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI)
// await mongoose.connect(process.env.MONGODB_URI as string, {
//   dbName: "Tomato",
// });        
await mongoose.connect(process.env.MONGODB_URI as string,  {
  dbName: "Tomato",
});
console.log("connected to mongodb") 
    } catch (error) {  
        console.log(error)  
        
    }
}

export default connectDB 