const mongoose = require('mongoose');
const connectDatabase = ()=>{
    const dburl = process.env.DB_URL;
    // console.log(dburl)
    mongoose.connect(dburl,{
        
    }).then(()=>{
        console.log("DATABASE CONNECTED SUCCESSFULLY");
    }).catch((err)=>{
        console.log("An Error occur while connecting to database")
    })
}

module.exports = connectDatabase;