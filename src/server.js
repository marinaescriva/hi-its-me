// const express = require ('express'); // vamos a trabajar con export e import  no con require

//importanmos dependencias de librerias antes de los ficheros si los hay.
import express from 'express'; //quitar los bigotes por defecto
import 'dotenv/config';

const app = express();

//parsea el body
app.use(express.json());

const PORT = process.env.PORT || 4001;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})

