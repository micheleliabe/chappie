const express = require('express');
const route = express.Router();
const S3 = require('./src/aws/s3')
const route53 = require('./src/aws/route53')

route.use(express.json({
    extended: true
}))

/*
    LOGIN
*/

const loginController = require('./src/controllers/loginControler')
route.get('/', loginController.login)

/*
    DASHBOARD > HOME
*/

const dashboardController = require('./src/controllers/dashboardControler')
route.get('/dashboard', dashboardController.dashboard)

/*
    DASHBOARD > HOST > STATIC SITE
*/

const static_sites_controller = require('./src/controllers/static_sites_Controller')
route.get('/host/static_sites', static_sites_controller.createSitePage)

/*
    DASHBOARD > ADMINISTRAR > USUARIOS
*/

const userController = require('./src/controllers/userController')
const user_validator = require('./src/validators/user_validator') // Validator for users

route.get('/users/registry', userController.registerPage)
route.post('/users/registry',user_validator.checklist,userController.register)
route.put('/users/registry', userController.update)
route.delete('/users/registry', userController.delete)
route.get('/users/all_users',userController.list)


//Cria um novo bucket na conta da AWS
route.post('/createS3bucket', S3.createBucket)

route.get('/AmazonS3WebsiteEndpoints', S3.AmazonS3WebsiteEndpoints)

//Altera as configuraçao de sites estaticos em um bucket 
route.put('/enableWebSiteHosting', S3.enableWebSiteHosting)

//Verifica se um bucket esta habilitado para sites estaticos
route.get('/hasWebSiteConfiguration', S3.hasWebSiteConfiguration)

//Verifica a configuraçao de CORS atual em um determinado bucket
route.get('/getCors', S3.getCors)

//Define as configuraçao de CORS para um determinado bucket
route.put('/setCors', S3.setCors)

route.get('/getBuckets', S3.getBuckets)

route.put('/enablePublicAccess', S3.enablePublicAccess)

route.post('/createObject', S3.createObject)

route.put('/putbucektPolicy', S3.putbucektPolicy)

route.get('/checkdomain', route53.checkdomain)

route.get('/sugerir', route53.sugerirDominios)

module.exports = route;