//Chappie Server

require('dotenv').config();
const path = require('path');

//Modulos necessarios para configuração do express
const express = require('express');

const app = express();

//Modulo utilizado para estilizar as saidas no console
const chalk = require('chalk');

// cria linhas de separação
const _Display = require('./src/display/_Display')

//Utilizado para gerar as ASCII art que aparecem nos comandos de CLI
const figlet = require("figlet-promised");

//Importa o mongoose
const mongoose = require('mongoose');

//Tenta conectar com o banco de dados, se conseguir emite um sinal
mongoose.connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.emit('pronto');
  })
  .catch(e => console.log(e));

//Modulos utilizados para salvar a sessão do usuario
const session = require('express-session');
const MongoStore = require('connect-mongo');

//Utilizado para disparar menssagens
const flash = require('connect-flash');

//Congigurações de segurança
const helmet = require('helmet');
const csrf = require('csurf')
const {
  middlewareGlobal,
  checkCsrfError,
  csrfMiddleware
} = require('./src/middlewares/middleware')

// app.use(helmet());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
const {body, validationResult} = require('express-validator')

//Define os diretorios publicos
app.use(express.static(path.resolve(__dirname, 'public', 'dist')));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap-icons")));
app.use(express.static(path.join(__dirname, "node_modules/tabulator-tables/dist/css")));
app.use(express.static(path.join(__dirname, "node_modules/tabulator-tables/dist/js")));
app.use(express.static(path.join(__dirname, "node_modules/tabulator-tables/dist/css/bootstrap/")));

const sessionOptions = session({
  secret: '855654aFkOL10Wp098sTj',
  store: MongoStore.create({
    mongoUrl: process.env.CONNECTIONSTRING  
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//Modulo utilizado para criar layouts com o EJS
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)

//Define o layout padrão
app.set('layout', path.resolve(__dirname, 'src', 'views', 'layouts', 'layout.ejs'));

// Se estiver no modo de procução, ativa a verificação do csrf
if (process.env.MODE == 'PROD') {
  app.use(csrf())
  app.use(middlewareGlobal)
  app.use(checkCsrfError)
  app.use(csrfMiddleware)
}

const routes = require('./routes');
app.use(routes);


const cors = require('cors');
app.use(cors)


app.on('pronto', () => {
  app.listen(3000, () => {
    async function welcome() {
      const logo = await figlet("chappie");
      console.log(chalk.blueBright(logo));
      console.log('')
      console.log(chalk.gray('        Simple S3 host platform'))

      console.log('')
      console.log(chalk.greenBright(chalk.bold('Service is started')))
    }
    welcome();
  });
});