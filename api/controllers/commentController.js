(function(comment){
    var templates = require("./controllerTemplates");
    var commentService = require("../services/commentService");
    
    comment.init =function(app){
        app.get("/api/task/:taskId/Comments",function(req,res){
            
            templates.response();


        });
        app.post("/api/task/:taskId/Comments",function(req,res,next){
            
            var taskId = req.params.taskId;
            var comment = req.body;

            commentService.addComment(taskId,comment,function(err,result){
                templates.response(res,err,result);

            })
        
        });

        app.put("/api/task/:taskId/Comments/:index",function(req,res){

        
        })
        

    };

    

})(module.exports)