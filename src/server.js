import app from "./app.js";
import dotenv from "dotenv"
dotenv.config();
import { connectDB } from "./config/db.js";

connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
    
})