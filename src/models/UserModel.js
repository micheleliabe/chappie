const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    last_name: {
        type: 'string',
        required: true
    },
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    },
    isAdministrator: {
        type: 'boolean'
    }
})

const UsuarioModel = mongoose.model('Usuario', usuarioSchema)

class Usuario {
    constructor(body) {
        this.body = body
        this.user = null
    }

    async register() {
        try {
            this.user = await UsuarioModel.create(this.body)
            console.log('New user created :', this.user)
            return {
                status: 200
            }
        } catch (e) {
            console.error('Failed to create user')
            console.log(e)
            return {
                status: 400
            }
        }
    }

    async update() {
        try {
            const filter = this.body.user_id
            const update = this.body.user_data
            this.user = await UsuarioModel.findByIdAndUpdate(filter,update,{
                new : true
            })
            console.log('New user updated :', this.user)
            return {
                status: 200
            }
        } catch (e) {
            console.error('Failed to update user')
            console.log(e)
            return {
                status: 400
            }
        }
    }

    //Remove user
    async delete() {
        try {
            const filter = this.body.user_id
            this.user = await UsuarioModel.findByIdAndRemove(filter)
            console.log('user removed :', this.user)
            return {
                status: 200
            }
        } catch (e) {
            console.error('Failed to remove user')
            console.log(e)
            return {
                status: 400
            }
        }
    }

    //Get all users
    async list() {
        try {
            this.user = await UsuarioModel.find({})
            return {
                status: 200,
                users: this.user
            }
        } catch (error) {
            console.log('Erro')
        }
    }
}

module.exports = Usuario