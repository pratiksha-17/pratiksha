
const { TestModel } = require('../Model/testModel')
const  responses = require('../Module/response')

exports.requiresLogin = async(req, res, next) => {
    let { access_token } = req.headers;
    if (access_token) {
    var data = await TestModel.findOne({ access_token })
            if(data){
                    req.test = data;
                    next();
            }else{
                console.log("error")
                responses.authenticationErrorResponse(res);
            }
    } else {
        (responses.parameterMissingResponse(res));
        return;
    }
    }

