const middleware = require('./app.middle.config');
const appConfig = require('./app.config');
const connection = require('./database.config');


module.exports = {
    middleware,
    appConfig,
    connection
}