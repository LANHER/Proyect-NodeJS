const express = require('express');
const empleados = express.Router();
const db = require('../config/database');


//Agregar nuevos empleados
empleados.post("/add", async (req, res, next)=>{
    const {nombre, apellidos, telefono, email, direccion } = req.body;
    if(nombre && apellidos && telefono && email && direccion){
        let query = "INSERT INTO empleados (nombre, apellidos, telefono, email, direccion)";
        query += `VALUES('${nombre}', '${apellidos}','${telefono}','${email}','${direccion}')`;
        const rows = await db.query(query);
        
        if (rows.affectedRows ==1){
            return res.status(201).json({code:201 , message:"Empleado Insertado Correctamente" }); 
        }
    
        return res.status(500).json({code:500, message:"Ocurrió un Error"});
    }
    return res.status(500).json({code:500, message:"Campos Incompletos"});
});

//Eliminar empleados por su ID
empleados.delete('/delete', async(req,res,next)=>{
    const {id_usuario} = req.body;
 
    if(id_usuario){
        const query = `DELETE FROM empleados WHERE id_empleado=${id_usuario}`;
        const rows = await db.query(query);
        
        if(rows.affectedRows ==1){
            return res.status(200).json({code:200, message: "Empleado Eliminado Correctamente"});
        } 
            return res.status(404).json({code:404, message: "Empleado No Encontrado"});
    }
    return res.status(500).json({code:500, message:"Campos Incompletos"});
});

//Editar información del Empleado
empleados.put('/:id([0-9]{1,3})', async(req,res,next)=>{
    const { nombre, apellidos, telefono, email, direccion} =req.body;

    if(nombre && apellidos && telefono && email){
        let query = `UPDATE empleados SET nombre='${nombre}',apellidos='${apellidos}',`;
        query += `telefono='${telefono}',email='${email}',direccion='${direccion}' WHERE id_empleado=${req.params.id};`;
        const rows = await db.query(query);
        
        if (rows.affectedRows ==1){
            return res.status(200).json({code:200 , message:"Empleado Actualizado Correctamente" }); 
        }
    
        return res.status(500).json({code:500, message:"Ocurrió un Error"});
    }
    return res.status(500).json({code:500, message:"Campos Incompletos"});
});

//Actualizar nombre empleado de nuevo
empleados.patch('/:id([0-9]{1,3})', async(req,res,next)=>{
        if(req.body.nombre){
        let query = `UPDATE empleados SET nombre='${req.body.nombre}'WHERE id_empleado=${req.params.id}`;
        const rows = await db.query(query); 
        
        if (rows.affectedRows ==1){
            return res.status(200).json({code:200 , message:"Empleado Actualizado Correctamente" }); 
        }
        return res.status(500).json({code:500,message:"Ocurrió un Error"});
    }
    return res.status(500).json({code:500,message:"Campos incompletos"});
});

//Mostrar empleados po búsqueda de nombre
empleados.get('/:name([A-Za-z]+)',async (req, res, next)=>{
    const name = req.params.name;
    const empi = await db.query("SELECT * FROM  empleados WHERE nombre = '"+name+"';");
    if (empi.length>0){
        res.status(200).send({code:200, message:empi}); 
    }
    res.status(404).send({code:404, message:"Empleado NO encontrado"});
});

module.exports = empleados;