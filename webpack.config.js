
module.exports = {
  entry: ['./setup.js', './run.js'],
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      'https://unpkg.com/chai@4.1.2/chai.js': 'chai/chai.js',
      'https://cdn.skypack.dev/@100mslive/hmsvideo-web': '@100mslive/hmsvideo-web',
    }
  },
  module: {
    rules: [
      {
        test: [require.resolve('chai/chai.js'),require.resolve('@100mslive/hmsvideo-web')],
        use: 'script-loader'
      }
    ]
  },
};

