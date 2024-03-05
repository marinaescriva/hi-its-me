const express = require ('express');

const app = express();

//parsea el body
app.use(express.json());

const PORT = process.env.PORT || 4001;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})

