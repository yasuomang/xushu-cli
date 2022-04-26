const { version } = require('../package.json');
// 存储模板的位置
const downloadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.template`;
const repoList = [
    { projectName: 'vite_vue3_ts', url:'https://github.com/yasuomang/vite_vue3_ts.git' },
    { projectName: 'vue2_js', url:'' }
]
module.exports = {
  version,
  downloadDirectory,
  repoList
};
