const path = require('path');

export default config => {
  config.resolve.alias
    .set('src', path.resolve(__dirname, 'src'))
    .set('components', path.resolve(__dirname, 'src/components'))
    .set('utils', path.resolve(__dirname, 'src/utils'))
}
