import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './../webpack.config.client.js'
import config from './../config/config'

const compile = (app) =>
{
    if (config.env == "development")
    {
        const compiler = webpack(webpackConfig)
        const middleware = webpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath
        })
        app.use(middleware)
        app.use(WebpackHotMiddleware)
    }
}

export default{ compile }