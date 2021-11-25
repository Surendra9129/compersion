const port=7878;
const express=require('express');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());

const connect=()=>{
    return mongoose.connect('mongodb+srv://surendra:ssurendra9@cluster0.n3ctp.mongodb.net/movie')
}

const movieSchema=new mongoose.Schema(
    {
        id:{type:Number,required:true},
        movie_name:{type: String, required: true},
        movie_genre:{type:String, required:true},
        production_year:{type:Number,required:true},
        budget:{type:Number,required:true}
    
    },
    {
        versionKey:false,
        timestamps:true
    }
);

const movie= mongoose.model("movie",movieSchema);

app.get('/users',async(req,res)=>{
    const new_movie=await movie.find({}).lean().exec();
    res.status(201).send({new_movie});
})

app.post('/users',async(req,res)=>{
    const new_movie= await movie.create(req.body);
    res.status(201).send({new_movie});
})

app.get('/users/:id',async(req,res)=>{
    const new_movie=await movie.findById(req.params.id).lean().exec();
    res.send({new_movie});
})

app.path('/users:id',async(req,res)=>{
      const new_movie= await movie.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
      res.status(201).send({new_movie});
})

app.delete('/users/:id',async(req,res)=>{
    const new_movie= await movie.findByIdAndDelete(req.params.id).lean().exec();
    res.send(new_movie);
})

app.listen(port,async()=>{
    await connect();
    console.log(`running on port no ${port}`);
})