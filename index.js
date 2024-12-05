const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

//middleware para analizar los datos JSON
app.use(express.json());

//Configuracion para la conexion mysql
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "practica"
})

// conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
    } else {
        console.log("Conectado con exito a la base de datos");
    }
})


// Iniciar al servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})
