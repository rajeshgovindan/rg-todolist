(function(service){
    //var database = require("../data/database");
    var templates = require("./serviceTemplates");

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
    service.getComments = function(filter,next){
        templates.dbConHandler(function(db){
            db.tasks.findOne(filter,function(err,task){
                if(err){
                    console.log("Error while fetching task from database"+ err);
                    next(err,null);
                }
                next(null,task);
            })
           
        });
    }

    service.addComment = function(taskId,comment,next){
        templates.dbConHandler(function(db){
            var newValues = {
                $push: {
                    "comments": {
                        "date": "2018-03-14 00:00:00.000",
                        "comment": "Comment added from Comment controller"
                    }
                }
            };
            db.tasks.update({"tasksId": taskId},newValues,function(err,result){
                next(err,result);
            })
        })
    }

})(module.exports)