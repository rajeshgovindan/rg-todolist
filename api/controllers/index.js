(function(controllers){
    var taskController = require("./taskController");
    var commentController = require("./commentController");
   
controllers.init = function(app){
    taskController.init(app);
    commentController.init(app);
    //employeeController.init(app);
}
})(module.exports)