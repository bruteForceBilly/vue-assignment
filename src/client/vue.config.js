module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  indexPath: 'index.html',
  filenameHashing: true,

  pages: {
    index: {
      entry: './src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'FleetManager',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },

  lintOnSave: process.env.NODE_ENV !== 'production',

  configureWebpack: {
    devtool: 'source-map'
  }
}
