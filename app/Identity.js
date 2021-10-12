var pgsql = require('../lib/pgsql')
var hash =require('../lib/hash')

exports.createIdentity = async (req) => {
        var Username = req.body.Username
        var ProfileImageURL = req.body.ProfileImageURL || '';
        var ProfileBio = req.body.ProfileBio || '';
        var UserUUID = req.body.UserUUID
        var createdAt = Date.now()
        var IdentityUUID = hash.hashing(createdAt,Username)
        var modifiedAt = createdAt
        var numfollowing = 0;
        var numfollowers =0;
        var qarg=[IdentityUUID,Username,UserUUID,ProfileImageURL,ProfileBio,createdAt,modifiedAt,numfollowing,numfollowers]
        
        qname='Insert into "Identity" ("IdentityUUID","Username","UserUUID","ImageURL","ProfileBio","CreatedAt","ModifiedAt","NumFollowing","NumFollowers") values($1,$2,$3,$4,$5,$6,$7,$8,$9)' 
        try{
            result =await pgsql.conquery(qname,qarg)
            console.log(result.rowCount)
            if (result.rowCount == 1)
                data = {"IdentityUUID":IdentityUUID}
                return [null,data,"Successfully created user"]
        }
        catch(err)
        {
            return [err,null,"Error Inserting user to the database : "+err.detail]
        }

};

exports.updateIdentity = async (req) => {
    var {Username,IdentityUUID,ProfileImageURL,ProfileBio} = req.body;
    var modifiedAt = Date.now();
    var qarg=[Username,ProfileImageURL,ProfileBio,modifiedAt,IdentityUUID]
    qname='update "Identity" set "Username"= $1,"ImageURL"=$2,"ProfileBio"=$3,"ModifiedAt"= $4  where "IdentityUUID"=$5' 
    try{
        result =await pgsql.conquery(qname,qarg)
        console.log(UserUUID)
        console.log(result.rowCount)
        if (result.rowCount == 1)
            data ={"IdentityUUID":IdentityUUID}
            return [null,data,"Successfully updated user"]
    }
    catch(err)
    {
        return [err,null,"Error updating user to the database :"+err.detail]
    }

};

exports.deleteIdentity = async (req) => {
    var IdentityUUID = req.body.IdentityUUID;
    var qarg=[IdentityUUID]
    qname='delete from "Identity" where "IdentityUUID"= $1' 
    try{
        result =await pgsql.conquery(qname,qarg)
        console.log(result)
        if (result.rowCount == 1)
        {
            data = {"IdentityUUID":IdentityUUID}
            return [null,data,"Successfully deleted User"]
        }   
        else if(result.rowCount == 0)
        {
            err={'err':'Row does not exist'}
            return [err,null,"IdentityUUID does not exist"]
        }
    }
    catch(err)
    {
        console.log(err)
        return [err,null,"Error deleting from the database"]
    }

};

