const path = require('path');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  webpack(config) {
    config.resolve.modules.push(path.resolve('./'));
    config.module.rules.push({
      test: /.(png|jpg|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]?[hash]',
            emitFile: false,
            publicPath: '/',
          },
        },
      ],
    });
    return config;
  },
});
