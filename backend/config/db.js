const mongoose =require('mongoose')

async function connectDB(mongo_url){
    try{
        await mongoose.connect(mongo_url)
        console.log('connected to DB ')
    }   
    catch(err){
        console.log(err)
    }
}