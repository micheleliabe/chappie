const path =require('path')

exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors')
  next()
}

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};


exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render('pages/404', {
      titulo: 'Erro 404',layout: path.resolve('src', 'views', 'layouts', 'layout')
    });
  }
};

