const path = require('path');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  webpack(config, options) {
    config.resolve.modules.push(path.resolve('./'));
    return config;
  },
});