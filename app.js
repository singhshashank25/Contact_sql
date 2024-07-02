const express = require('express');
const app = express();
const db = require("./config/mysqldb")
const rounteridentify = require("./router/identify")
require("dotenv").config();
app.use(express.json());


db.query('SELECT 1').then(()=>{
    console.log("Database connected .....");
}).catch((error)=>console.log(error));

app.use('/identify',rounteridentify);

const port = 3000;
app.listen(port,()=>{
    console.log(`port listening on localhost:${port}`);
})