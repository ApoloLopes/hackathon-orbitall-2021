const http = require('http')
const app = require('./configurations/express')

http.createServer(app).listen(8080, function () {
    console.log(`[Cards Application - ${(new Date()).toISOString()}] The server is running on port: ${this.address().port}`)
})