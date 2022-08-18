const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin');

const authRouter = require('./routes/auth');

const PORT = 3000;
const app = express();
const DB = "mongodb+srv://danluck:maxpayne5@cluster0.rvpuuw3.mongodb.net/?retryWrites=true&w=majority"


//middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);



mongoose.connect(DB)
.then(() => {
    console.log('connection successful');
})
.catch((e) => {
    console.log(e);
})



app.listen(PORT, "0.0.0.0", () => {
    console.log(PORT);
});
