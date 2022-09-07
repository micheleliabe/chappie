const path = require('path'); // CommonJS
const webpack = require('webpack')
const  Dotenv  =  require ( 'dotenv-webpack' ) ;

module.exports = {
  mode: 'development',
  entry: {
    entry: './frontend/main.js',

    dashboard: {dependOn: 'entry', import: './frontend/assets/js/pages/dashboard.js'},
    dashboard_home : {dependOn: 'dashboard', import: './frontend/assets/js/pages/dashboard_home.js'},
    dashboard_administrar_usuarios : {dependOn: 'dashboard', import: './frontend/assets/js/pages/dashboard_administrar_usuarios.js'},
    dashboard_host_static_sites : {dependOn: 'dashboard', import: './frontend/assets/js/pages/dashboard_host_static_site.js'}
  },
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].js',
  },
  
  module: {
    rules: [{
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
            
          }
        }
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,

        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        },
      },
    ]
  },

  devtool: 'source-map',
  
  plugins : [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
   
    new Dotenv()
  ]
};
