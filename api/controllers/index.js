(function(controllers){
    var taskController = require("./taskController");
   
controllers.init = function(app){
    taskController.init(app);
    //employeeController.init(app);
}
})(module.exports)