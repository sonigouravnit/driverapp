var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'doc'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://ds143539.mlab.com:43539/heroku_hf2m23lb'
  },

  test: {
    root: rootPath,
    app: {
      name: 'doc'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/doc-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'doc'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://ds143539.mlab.com:43539/heroku_hf2m23lb'
  }
};

module.exports = config[env];
