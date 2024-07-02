const express = require('express');
const app = express();



app.use(express.json());

app.post("/identify",(req,res)=>{
    const email = req.body.email;
    const number = req.body.email;

    res.send("done");
})


const port = 3000;
app.listen(port,()=>{
    console.log(`port listening on localhost:${port}`);
})