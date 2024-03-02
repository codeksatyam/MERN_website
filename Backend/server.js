const app =require("./app");
const dotenv =require("dotenv");
//config
const connectDatabase=require("./config/database");
const { Server } = require("http");

dotenv.config({path:"Backend/config/config.env"});

//handling uncaught error
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to uncaught exception`);

    Server.close(()=>{
        process.exit(1);
    });
});

//connecting to database
connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
});



//unhandled promise rejection

process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to Unhandled promise Rejection`);

    Server.close(()=>{
        process.exit(1);
    });
});