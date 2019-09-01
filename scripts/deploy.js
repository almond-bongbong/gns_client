const SSH2Promise = require('ssh2-promise');
const path = require('path');
const remotePath = '/deploy/memopad_web';
const sshconfig = {
  host: '13.209.56.51',
  username: 'ec2-user',
  identity: '/Users/cmlee/.ssh/LightsailDefaultPrivateKey-ap-northeast-2.pem'
};

const ssh = new SSH2Promise(sshconfig);

(async function(){
  try {
    await ssh.connect();
    var sftp = ssh.sftp();
    console.log('Connection established');

    await sftp.fastPut(path.resolve(__dirname, '../build.zip'), `${remotePath}/build.zip`);

    await ssh.exec(`rm -rf ${remotePath}/build`);
    await ssh.exec(`rm -rf ${remotePath}/dist`);
    await ssh.exec(`cd ${remotePath}; unzip -o build.zip`, { pty: true }, (err, stdio) => {
      stdio.on('exit', async () => {
        let result;
        console.info(`* Complete unziping "build.zip" on the server`);

        await ssh.exec(`rm -rf ${remotePath}/build.zip`);

        result = await ssh.exec('forever stopall');
        console.log(result);
        result = await ssh.exec(`cd ${remotePath}; forever start dist/server.js`);
        console.log(result);

        console.info(`deploy succeeded!`);

        ssh.close();
      });
    });


  } catch (e) {
    console.log(e);
  }
})();


