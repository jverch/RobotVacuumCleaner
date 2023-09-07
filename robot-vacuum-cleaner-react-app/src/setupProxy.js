const { createProxyMiddleware }=require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api/schedule', {
            target: 'http://localhost:3001',
            changeOrigin: true,
        }),
    );
    app.use(
        createProxyMiddleware('/api/getData', {
            target: 'http://localhost:3002',
            changeOrigin: true,
        }),
    );
}