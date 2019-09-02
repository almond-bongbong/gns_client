module.exports = {
  apps: [{
    name: 'gns-client',
    script: './server.js',

    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
  deploy: {
    production: {
      user: 'ec2-user',
      key: '/Users/cmlee/.ssh/LightsailDefaultPrivateKey-ap-northeast-2.pem',
      host: '13.209.56.51',
      ref: 'origin/master',
      repo: 'https://github.com/almond-bongbong/gns_client.git',
      path: '/deploy/gns-client',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    },
  },
};
