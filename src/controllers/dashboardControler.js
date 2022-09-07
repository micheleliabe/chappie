const path = require('path')

// //Carrega o dashboard
exports.dashboard = (req, res) => {
    res.render('pages/dashboard_home', {
        layout: path.resolve('src', 'views', 'layouts', 'dashboard'),
        titulo: 'Dashboard'
    })
}

