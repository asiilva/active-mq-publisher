const env = process.env.NODE_ENV || 'development';
const config = require(`./${env}`);

const globalSettings = {
  api: {
    version: '1.0'
  }
};

export default Object.assign(globalSettings, config);