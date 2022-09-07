const mongoose = require('mongoose')

const siteSchema = new mongoose.Schema({
    project: {
        type: 'string',
        required: true
    },
    domainName: {
        type: 'string',
        required: true
    },
    region: {
        type: 'string',
        required: true
    },
  
})

const siteModel = mongoose.model('Site', siteSchema)

class Site {
    constructor(body) {
        this.body = body
        this.site = null
    }

    async register() {
        try {
            this.site = await siteModel.create(this.body)
            console.log('New site created :', this.site)
            return {status : 200}
        } catch (e) {
            console.error('Failed to create site')
            return {status : 400}
        }
    }
    
    //Get all users
    async list() {
        try {
            this.site = await siteModel.find({})
            return {status : 200, sites : this.site}
        } catch (error) {
            console.log('Erro')
        }
    }
}

module.exports = Site