const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error ${err.message}`);
    console.log("Server is Shutting Down Due to UnCoughtError.");
    process.exit(1);
})
// Eg. console.log(youtube);

//config
dotenv.config({path:"backend/config/config.env"});
 
// connect To Data IMPORTANT When PostMan API Are created successfully Then call below function 
connectDatabase()

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
