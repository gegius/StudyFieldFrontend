const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({ target: 'http://backend:2000' }));
  app.use('/auth', createProxyMiddleware({ target: 'http://backend:2000' }));
};
