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


// crear una nueva materia
app.post("/materias", (req, res) => {
    const materia = req.body;
    const sql = "INSERT INTO materias (NombreMateria, Descripcion, Nota) VALUES(?, ?, ?)";

    db.query(
        sql, [materia.NombreMateria, materia.Descripcion , materia.Nota],
        (err, result) => {
            if (err) {
                console.error("Error al crear una nueva materia:", err);
                res.status(500).json({ error: "Error al crear una nueva materia"});
            } else {
                console.log("Materia creada con exito");
                res.status(201).json({ message: "Materia creada", id: result.insertId});
            }
        }
    )
})


// Iniciar al servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})
