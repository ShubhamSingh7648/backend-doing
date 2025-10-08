import dotenv from "dotenv";
import express from "express"


import connectDB from "./db/index.js";
 const app = express();

dotenv.config({ 
    path: "./.env" 
}); 


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 800, ()=>{
        console.log('serever is runniin on the ', process.env.PORT)
    })
})
.catch((err)=> {
    console.log("mongo db connection failed;;",err)
})


  app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running : ${process.env.PORT}`)
    })

    




















// import express from 'express';

// const app = express();


// (async ()=> {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.listen(process.env.PORT, ()=>{
//             console.log(`port is lsitening to ${process.env.PORT}`)
//         })
        
//     } catch (error) {
//         console.log(error);
//     }
// })();                                                                     