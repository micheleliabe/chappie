const {validationResult, check } = require('express-validator')
const path = require('path')
const Site = require('../models/StaticSiteModel')

//Render
exports.createSitePage = (req, res) => {
    res.render('pages/dashboard_host_static', {
        layout: path.resolve('src', 'views', 'layouts', 'dashboard')
    })
}

//Register site
exports.register = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        //Register a new user
        const site = new Site(req.body)
        const response = await site.register()
        res.send(response)
    } else {
        res.status(400).json({
            errors: errors.array()
        })
    }
}

exports.list = async (req, res) => {
    const site = new Site()
    const response = await site.list()
    res.send(response.sites)
}
