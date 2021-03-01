const { TestModel } = require('../Model/testModel')
const status = require('../Module/status')
const Joi = require('joi')
const md5 = require('md5')
const responses = require('../Module/response.js')


   
                                        /*=========================================
                                        +++++++++++++++Create++++++++++++++
                                        =========================================*/


exports.create = async(req,res) => {
    try{
            const schema = Joi.object().keys({
                firstName: Joi.string().optional(),
                lastName: Joi.string(),
                password: Joi.string().required(),
                emailId : Joi.string().required()
            })
            const result = Joi.validate(req.body, schema, { abortEarly: true });
            if (result.error) {
                if (result.error.details && result.error.details[0].message) {
                    res.status(status.BAD_REQUEST).json({ message: result.error.details[0].message });
                } else {
                    res.status(status.BAD_REQUEST).json({ message: result.error.message });
                }
                return;
            }
            var {firstName,lastName,emailId, password} = req.body
            var emailCheck = await TestModel.findOne({emailId})
            if(emailCheck){
                throw new Error('Email is already registered with us')
            
            }
            password = md5(password)
            var access_token = md5(new Date())
            var saveData = {password,firstName,access_token,lastName,emailId}
            var data = new TestModel(saveData)
            var userData = await data.save(saveData)
            if(userData){
                res.status(status.SUCCESS_STATUS).json({ message: 'Created', response: userData })
            }else{
                res.status(status.SERVER_ERROR).json({ message: 'Unable to create ' })
            }
        }catch(err){
             responses.sendError(err.message, res)

        }
}

                                        /*=========================================
                                        +++++++++++++++Auth Middleware++++++++++++++
                                        =========================================*/
exports.viewDetails = async (req, res) => {
    try {
        var access_token = req.test.access_token;
        var data = await TestModel.findOne({access_token})
        if (data) {
            res.status(200).json({ message: "Data found" ,response : data})
        } else {
            res.status(400).json({ message: "User not found" })
        }
    } catch (err) {
        err => { console.log(err).sendError(err.message, res) }
    }
}