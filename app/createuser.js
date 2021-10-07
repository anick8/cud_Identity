var pgsql = require('../lib/pgsql')
var hash =require('../lib/hash')

exports.createuser = async (req) => {
        var Username = req.body.username;
        var createdAt = Date.now()
        var UserUUID = hash.hashing(createdAt,Username)
        var createdBy = Username
        var modifiedAt = createdAt
        var qarg=[UserUUID,Username,createdAt,createdBy,modifiedAt]
        qname='Insert into "UserInfo" ("UserUUID","Username","CreatedAt","CreatedBy","ModifiedAt") values($1,$2,$3,$4,$5)' 
        try{
            result =await pgsql.conquery(qname,qarg)
            console.log(UserUUID)
            console.log(result.rowCount)
            if (result.rowCount == 1)
                data ={"UserUUID":UserUUID}
                return [null,data,"Successfully created user"]
        }
        catch(err)
        {
            return [err,null,"Error Inserting user to the database"]
        }

};
exports.updateuser = async (req) => {
    var Username = req.body.username;
    var UserUUID = req.body.useruuid;
    var modifiedAt = Date.now();
    var qarg=[Username,modifiedAt,UserUUID]
    qname='update "UserInfo" set "Username"= $1,"ModifiedAt"= $2  where "UserUUID"=$3' 
    try{
        result =await pgsql.conquery(qname,qarg)
        console.log(UserUUID)
        console.log(result.rowCount)
        if (result.rowCount == 1)
            data ={"UserUUID":UserUUID}
            return [null,data,"Successfully updated user"]
    }
    catch(err)
    {
        return [err,null,"Error updating user to the database"]
    }

};
exports.deleteuser = async (req) => {
    var UserUUID = req.body.useruuid;
    var qarg=[UserUUID]
    qname='delete from "UserInfo" where "UserUUID"= $1' 
    try{
        result =await pgsql.conquery(qname,qarg)
        console.log(UserUUID)
        console.log(result.rowCount)
        if (result.rowCount == 1)
            data ={"UserUUID":UserUUID}
            return [null,data,"Successfully deleted User"]
    }
    catch(err)
    {
        return [err,null,"Error deleting from the database"]
    }

};

