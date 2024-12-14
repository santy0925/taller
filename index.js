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
    database: "practica2"
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

//obtrener todas las materias
app.get("/materias",(req, res) => {
    const sql = "SELECT * FROM materias";
    db.query(sql, (err, results) =>{
        if (err) {
            console.error("Error al obtener las materias", err);
            res.status(500).json({ error: "error al obtener las materias de la tabla"});
        } else {
            console.log("materia obtenida con exito");
            res.status(200).json(results);
        }
    });
});

//llamar materia a travez de su id
//URL
app.get("/materias/:id",(req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM materias WHERE IDMateria = ?"
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener la materia", err);
            res.status(500).json({ error: "error al cargar las materias a la tabla"});
        } else {
            console.log("materia obtenida con exito");
            res.status(200).json(results);
        }
    });
});

//actualizar la materia desde su id
app.put("/materias/:id",(req, res) => {
    const id = req.params.id;
    const materia = req.body;
    const sql =  "update materias SET NombreMateria = ?, Descripcion = ?, Nota = ?"
    db.query(sql, [materia.NombreMateria, materia.Descripcion , materia.Nota, id], (err) => {
        if (err) {
            console.error("Error al obtener la materia desde su id", err);
            res.status(500).json({ error: "error al actualizar"});
        } else {
            console.log("materia actualizada");
            res.status(201).json(results);
        }
    });
});



// Iniciar al servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})

