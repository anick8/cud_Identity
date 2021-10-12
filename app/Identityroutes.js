var pgsql = require('../lib/pgsql')
var utils = require('../common/utils')
var Identity = require('./Identity');
module.exports = (app, console) => {
//    var utils = require('../common/utils');

    app.post('/createIdentity',async (req, res) => {
         result  = await Identity.createIdentity(req);
         utils.handleresult(res,result)
        }
    )
    app.post('/updateIdentity',async (req, res) => {
        result  = await Identity.updateIdentity(req);
        utils.handleresult(res,result)
       }
    )
    app.post('/deleteIdentity',async (req, res) => {
        result  = await Identity.deleteIdentity(req);
        utils.handleresult(res,result)
        }
    )

    console.log("Installing TOKEN Routes")
};
