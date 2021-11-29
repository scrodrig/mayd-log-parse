const path = require('path');

module.exports = {
  name: 'deployment',
  mode: 'production',
  entry: './src/parser.ts',
  target: 'node',
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    base_path: path.resolve(__dirname, '/'),
  },
  optimization: {
    usedExports: true,
  },
};
