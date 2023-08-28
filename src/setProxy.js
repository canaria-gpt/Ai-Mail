const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://20.214.111.0:8080',
      changeOrigin: true,
    })
  );
};