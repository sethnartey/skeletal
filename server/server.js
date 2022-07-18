import app from './express'
import config from "./../config/config";
import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)
mongoose.connection.on('error', () =>
{
    throw new Error(`unable to connect do database: ${config.mongoUri}`)
})
app.listen(config.port, (err) =>
{
    if (err)
    {
        console.log(err)
    } else
    {
        console.info('Sever started on port %s.', config.port)
    }
})


