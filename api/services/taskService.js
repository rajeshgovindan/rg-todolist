(function(service){
    //var data = require("../data");
    var database = require("../data/database");
service.get= function(filter,next){
    if (database.getDb(function (err, db) {
        if (err) {
            ///Data connection error
            console.log("Error in connecting the database " + err);

        } else {
            db.tasks.find({}).toArray(function (err, tasks) {
                if (err) {
                    console.log("Error in fetching employees");
                    next(err, null);
                } else {
                    next(err, tasks);
                    //next();
                }


            });

        }
    }));
};

service.add = function(task,next){
    if (database.getDb(function (err, db) {
        if (err) {
            ///Data connection error
            console.log("Error in connecting the database " + err);

        } else {
            db.tasks.insert(task,function (err) {
                if (err) {
                    console.log("Error in while inserting task");
                 }
                 next(err,null);


            });

        }
    }));
};
})(module.exports)