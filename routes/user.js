const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

user.post("/signin",async(req, res, next)=>{
    const{email, password} = req.body

    if(email && password){
        let query = "INSERT INTO usuarios (email, password) ";
         query += `VALUES ('${email}', '${password}')`;
        const rows = await db.query(query);

        if(rows.affectedRows==1){
            return res.status(201).json({code:201, message: "Usuario registrado correctamente"});
        }
        return res.status(500).json({code:500, message: "Ocurrió un error"});
    }
        return res.status(500).json({code:500, message: "Campos Incompletos"});
});

user.post("/login",async(req,res,next)=>{
    const {email,password}=req.body;
    const query = `SELECT * FROM usuarios WHERE email= '${email}' AND password= '${password}';`;
    const rows = await db.query(query);
    
    if (email && password){
        if(rows.length == 1){
            const token = jwt.sign({
                email: rows[0].email,
                password: rows[0].password
            },"debugkey");
            return res.status(200).json({code: 200, message:token});
        }
        else{
            return res.status(200).json({code: 401, message:"Usuario y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({code:500, message: "Campos Incompletos"});
});

user.get("/", async(req, res, next)=>{
    const query = "SELECT * FROM usuarios";
    const rows = await db.query(query);

    return res.status(200).json({code:200, message:rows});
});


module.exports = user;