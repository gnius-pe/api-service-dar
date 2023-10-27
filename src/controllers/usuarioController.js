const express = require('express')
const Usuario = require('../models/usuario');
const { cliente,connectionBD,collection } = require('../config/conection');


exports.postUser = async (req,res) => {
    await connectionBD();

    const {
        nombre,
        age
    } = req.body;
    const nuevoUsuario = new Usuario(req.body)

    console.log(nuevoUsuario)
    /*
    nuevoUsuario
    .save()
    .then((data)=> res.json(data))
    .catch((error) => res.json({
        message : error
    }))*/
    
    try{
        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json(usuarioGuardado);
    } catch (error){
        res.status(500).json({
            error:'Error en el servidor.'
        })
    }
     
}   

exports.getUsuarios = async  (req,res) => {
    try{
        const datos = await collection.find({}).toArray();
        res.json(datos)
    }catch( error){
        res.status(500).json({error:"error en el servidor"})
    }
}