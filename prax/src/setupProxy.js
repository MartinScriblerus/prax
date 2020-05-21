const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true,
    })
  );
};
// module.exports = function(app2) {
//     app2.use(
//       '/socket',
//       createProxyMiddleware({
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//       })
//     );
//   };