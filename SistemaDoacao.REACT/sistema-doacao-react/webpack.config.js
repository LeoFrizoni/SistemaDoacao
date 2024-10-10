const path = require('path');

module.exports = {
  // Arquivo de entrada
  entry: './src/components/pages/home/index/index.html',

  // Arquivo de saída
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  // Regras para os loaders
  module: {
    rules: [
      {
        // Loader para arquivos HTML
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        // Loader para arquivos CSS
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Loader para arquivos de imagem
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
    ],
  },

  mode: 'development',

  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
