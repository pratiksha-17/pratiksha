const { conn, mongoose } = require('../Services/mongoose.js')

let testSchema = mongoose.Schema({

    emailId : {
        type : String
    },
    emailId : {
        type : String
    },
    access_token : {
        type : String
    },
    firstName : {
        type : String
    },
    lastName : {
        type : String
    }
})
exports.TestModel = conn.model('Test', testSchema) 