import { app } from "./app.js";
import {config} from 'dotenv'
import { mongoConnect } from "./data/database.js";

config({ path: 'data/config.env' });

mongoConnect();

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT} for ${process.env.NODE_ENV}`)
})