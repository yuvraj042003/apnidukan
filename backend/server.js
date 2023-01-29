const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error ${err.message}`);
    console.log("Server is Shutting Down Due to UnCoughtError.");
    process.exit(1);
})
// Eg. console.log(youtube);
// cros = for add frontend and backend

//config
dotenv.config({path:"backend/config/config.env"});
 
// connect To Data IMPORTANT When PostMan API Are created successfully Then call below function 
connectDatabase()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const server = app.listen(process.env.PORT,()=>{
    console.log(`Sever is working on http://localhost:${process.env.PORT}`);
})

// UnHandlaed Promise Rejection When a problem Create Due to Canges Bad Gatway Method in Server file
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the server due to Unhandalded Error Rejection`);
    server.close(()=>{
        process.exit(1);
    });
})
