import express from "express";
import dotenv from "dotenv";
import products from "./Data/products.js";
import connectDB from "./config/DB.js";
import ProductRouters from "./Routes/ProductRouters.js";
import{NotFound,ErrorHandler} from "./Middlewares/errorMiddlewares.js";
import userRoutes from"./Routes/userRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import morgan from 'morgan'

dotenv.config();

connectDB();//connecting mongodb
const app =express();

if(process.env.NODE_ENV==='development'){
app.use(morgan('dev'))
}
app.get("/",(req,res)=>{
   res.send("running");
});
app.use(express.json());

app.use("/api/products",ProductRouters);
app.use("/api/users",userRoutes);
app.use("/api/orders",orderRoutes)
app.get("/api/config/paypal",(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))
app.use(NotFound);
app.use(ErrorHandler);



 const PORT=process.env.PORT;
app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`))