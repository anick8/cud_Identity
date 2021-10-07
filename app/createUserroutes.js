var pgsql = require('../lib/pgsql')
var utils = require('../common/utils')
var createuser = require('./createuser')
module.exports = (app, console) => {
//    var utils = require('../common/utils');

    app.post('/createuser',async (req, res) => {
         result  = await createuser.createuser(req);
         utils.handleresult(res,result)
        }
    )
    app.post('/updateuser',async (req, res) => {
        result  = await createuser.updateuser(req);
        utils.handleresult(res,result)
       }
    )
    app.post('/deleteuser',async (req, res) => {
        result  = await createuser.deleteuser(req);
        utils.handleresult(res,result)
        }
    )

    console.log("Installing TOKEN Routes")
};
