
module.exports = {
    entry: './src/App.js',
    output: {
        filename: './build.js'
    },
    devServer: {
      port: 3001
    }
 /* },
  module: {
    rules: [
     {
        test: /\.js$/,
        use: 'babel-loader'
     }
   ]
  },*/
};