(function(service){
    //var data = require("../data");
    var database = require("../data/database");

    var callDbTemplate = function(func){
        if (database.getDb(function (err, db) {
            if (err) {
                ///Data connection error
                console.log("Error in connecting the database " + err);
    
            } else {
                func(db);
            }
        }));
    };
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
service.updateTask = function(taskId,task,next){
    callDbTemplate(function(db){
        db.tasks.update({"tasksId": taskId},task,function(err,result){
            if(err){
                console.log("Error in updating the task "+ taskId);
                next(err);
            }
            next(err,result);
        })
    });
}
})(module.exports)