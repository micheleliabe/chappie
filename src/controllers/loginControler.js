const path = require('path')
//Salva a seção
exports.login = (req, res) =>{
    req.session.usuario = {nome:'Michel', logado:true};
    res.render('pages/login',{titulo:'Chappie - S3 Host platform'})
    return
}
