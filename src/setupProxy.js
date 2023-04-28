const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://bs1rpt05.ad.linedata.com/UMBReportingAdminPortal/Account/LogOn',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': ''
      }
    })
  );
};
