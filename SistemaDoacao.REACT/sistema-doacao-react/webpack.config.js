const webpack = require('webpack');

module.exports = {
  // ... outras configurações do Webpack
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser', // Substitui o processo no navegador
    }),
  ],
};
