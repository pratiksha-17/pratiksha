var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var path = require('path')
var glob = require('glob');
var logger = require('morgan')
var app = express();
app.use(logger('dev'))

// parse requests of content-type - application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './')));

app.use(cors());
 app.options('*', cors());


let initRoutes = () => {
    // including all route
    console.log("path", path.join(__dirname));
    
    glob("./src/Routes/*.js", { cwd: path.resolve(path.join(__dirname)) }, (err, routes) => {
        if (err) {
            console.log("Error occured including routes");
            return;
        }
        routes.forEach((routePath) => {
            require(routePath).getRouter(app);// eslint-disable-line
        });
        console.log("included " + routes.length + " route files");
    });
}

initRoutes();

app.listen(3000, function (a) {
    console.log("Listening to port 3000");
});









