const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(createProxyMiddleware([process.env.REACT_APP_API], {
        //需要请求的服务器地址
        target: process.env.REACT_APP_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
            [`^${process.env.REACT_APP_API}`]: "",
        }
    }))
    //匹配到/devApi后进行转发，并把path中的/devApi进行重写
    // app.use(proxy("/manage/api", {
    //     //需要请求的服务器地址
    //     target:"localhost:5000",
    //     changeOrigin:true,
    // }))
}
