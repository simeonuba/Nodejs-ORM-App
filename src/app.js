
const {middleware} = require('./config');
const router = require('./routes');

const App = (app) => {
    middleware(app);
    router(app);
}

module.exports = App;