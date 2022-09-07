const {validationResult, check } = require('express-validator')
const path = require('path')
const Usuario = require('../models/UserModel')

//Render
exports.registerPage = (req, res) => {
    res.render('pages/dashboard_administrar_usuarios', {
        layout: path.resolve('src', 'views', 'layouts', 'dashboard')
    })
}

//Register user
exports.register = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        //Register a new user
        const usuario = new Usuario(req.body)
        const response = await usuario.register()
        res.send(response)
    } else {
        res.status(400).json({
            errors: errors.array()
        })
    }
}


//Update user
exports.update = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        //Register a new user
        const usuario = new Usuario(req.body)
        const response = await usuario.update()
        res.send(response)
    } else {
        res.status(400).json({
            errors: errors.array()
        })
    }
}

//delete user
exports.delete = async (req, res) => {
    console.log('No controller')
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        //Register a new user
        const usuario = new Usuario(req.body)
        const response = await usuario.delete()
        res.send(response)
    } else {
        res.status(400).json({
            errors: errors.array()
        })
    }
}


exports.list = async (req, res) => {
    const usuario = new Usuario()
    const response = await usuario.list()
    res.send(response.users)
}

