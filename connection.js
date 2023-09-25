const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/test3",{
    useNewUrlParser:false,
    useUnifiedTopology:false  
}).then(()=>{
    console.log("connected to database"); 
}).catch((e)=>{
    console.log(e);
})