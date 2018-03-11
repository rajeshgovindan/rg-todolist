(function(database){
    var mongodb = require("mongodb");
    var client = require("mongodb").MongoClient;
    //var dbUrl = "mongodb://localhost:27017/rg-todolist"
    var dbUrl = null;
    var dbName = null;
    var theDb = null;
    database.init = function(dbhostname,dbport,databaseName,user,password){
        dbName=databaseName;
        var hostName = dbhostname|| "localhost";
        var port = dbport|| "27017";
        
        dbUrl = "mongodb://";

        if (user && password) {
            dbUrl += user + ':' + password + '@';
          }

        dbUrl += hostName+ ":" + port +"/" + databaseName ;
        //"mongodb://localhost:27017/openshiftDb"


    }

    database.getDb = function (next) {
        if (!theDb) {
            /// Database instance is not created
            client.connect(dbUrl, function (err, db) {
                if (err) {
                    ///Database connection error
                    next(err, null);
                } else {
                    //var dbins = db.db('rg-todolist');
                    var dbins = db.db(dbName);
                    theDb = {
                        db: dbins,
                        tasks: dbins.collection("tasks"),
                        //dburl = dbUrl
                    }
                    next(null, theDb);
                }
            })
        }
        else {
            next(null, theDb);
        }
    }
})(module.exports)