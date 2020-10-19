const mongoose = require('mongoose')
const http = require('http')
const app = require('./app/app')
const config = require('./config')
const chalk = require('chalk')
mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('数据库连接成功')
        const serve = http.createServer(app)
        serve.on('error', () => {
            console.log(chalk.red(error))
        })    
        serve.listen(3000, (error) => {
            if (error) {
                console.log('服务器启动失败')
            } else {
                console.log('服务器启动成功')
                console.log(chalk.green(`http://${config.host}:${config.port}`))
            }
        })
    }
})