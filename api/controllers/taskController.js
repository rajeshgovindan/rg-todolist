(function (taskController) {

    var taskService = require("../services/taskService");
    taskController.init = function (app) {
        var responseHandler = function (res, err, data) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).json(data);
            }

        }
        app.get("/api/", function (req, res, next) {
            // taskService.get({},function(err,tasks){
            //     responseHandler(res,err,tasks);
            // })
            var data = {};
            data.message = "Welcome to RG tasklist api";
            res.status(200).json(data)
            //return {"message":"Welcome to RG tasklist api"};
        });


        app.get("/api/tasks", function (req, res, next) {
            taskService.get({}, function (err, tasks) {
                responseHandler(res, err, tasks);
            })
        })

        app.post("/api/tasks", function (req, res, next) {
            var task = req.body;
            taskService.add(task, function (err, tasks) {
                responseHandler(res, err, tasks);
            })
        })

        // app.post("/api/task/:taskId/Comments",function(req,res,next){
        //     responseHandler(res,null,null);
        // })


        app.put("/api/tasks/:taskId", function (req, res, next) {
            var taskId = req.params.taskId;
            var task = req.body;
            taskService.updateTask(taskId, task, function (err, result) {
                responseHandler(res, err, result);
            })
        })






    }
})(module.exports)