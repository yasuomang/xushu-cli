const { version } = require('../package.json');
const repoList = [
    { projectName: 'vite_vue3_ts_pc', url: 'https://github.com/yasuomang/template-vue3-ts.git' },
    { projectName: 'vite_vue3_ts_mobile', url: 'https://github.com/yasuomang/template-vue3-ts-m.git' },
    { projectName: 'lib', url: 'https://github.com/yasuomang/template-lib.git' },
    { projectName: 'koa2_ts_sequelize', url: 'https://github.com/yasuomang/template-koa-ts.git' },
    { projectName: 'vue2_js', url: '' },
]
module.exports = {
  version,
  repoList
};
