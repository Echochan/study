const path = require('path')
const Express =  require('express')
const favicon =  require('serve-favicon')
const httpProxy =  require('http-proxy')
const compression =  require('compression')
const connectHistoryApiFallback =  require('connect-history-api-fallback')
const config = require ('../config/config')

const app = new Express()
const port = config.port
const targrtUrl = `http://${config.targrtUrl}:${config.apiPort}`
const proxy = httpProxy.createProxyServer({
    target: targrtUrl
})

app.use('/api', (req, res) => {
    proxy.web(req, res, {target: targrtUrl})
})
app.use('/', Express.static(path.join(__dirname, "..", 'build')))
app.use('/', connectHistoryApiFallback())

app.use(compression())
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')))

//热更新
// if(process.env.NODE !== 'production') {
//     const Webpack = require('webpack')
//     const WebpackDevMiddleware = require('webpack-dev-middleware')
//     const WebpackHotMiddleware = require('webpack-hot-middleware')
//     const webpackConfig = require('../webpack.dev')

//     const compiler = Webpack(webpackConfig)

//     app.use(WebpackDevMiddleware(compiler, {
//         publicPath: '/',
//         stats: {colors: true},
//         lazy: false,
//         watchOptions: {
//             aggregateTimeout: 300,
//             poll: true
//         }
//     })) 
//     app.use(WebpackHotMiddleware(compiler))
// }   

app.listen(port, err => {
    if(err){
        console.log(err)
    }else {
        console.log(`===>open http://${config.host}:${config.port} in a browser to view the app`)
    }
})