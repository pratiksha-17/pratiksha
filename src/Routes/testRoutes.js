
var TestController = require('../Controller/testController.js');
var auth = require('../Module/auth')

exports.getRouter = (app) => {

    app.route('/test/create').post(TestController.create)

    app.route('/test/view').get(auth.requiresLogin,TestController.viewDetails)

    return app;
}