const app = require('./app')
const connectDatabase = require('./db/database.js');

process.on("uncaughtException", (err)=>{
    console.log(`Erro: ${err.message}`);
    console.log("SHUTTING DOWN UNCAUGHT EXCEPTION");
});
const port = process.env.PORT;
connectDatabase();
const server = app.listen(port,()=>{
    console.log(`SERVER LISTEN ON PORT ${port}`)
});

process.on("unhandledRejection",(err)=>{
    console.log(`shutting down the server for err ${err.message}`);
    console.log("shutting down the server for unhandle promise rejection");
    server.close(()=>{
        process.exit(1);
    })
})