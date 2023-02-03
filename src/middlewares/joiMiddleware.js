
const HTTPError = require("../utils/HTTPError");
const {postSchema,patchSchema}=require("./schema");

exports.validateCreateTask=(req,res,next)=>{
  try {
    const{error,value}=postSchema.validate({title:req.body.title});
    if (error) {
      next();
      throw new HTTPError(error.message, 400);
    }
    else{
      next();
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      res.status(error.code).json({ message: error.message });
    }
    res.status(400).json(error.toString());
  }
};
exports.validatePatchTask=(req,res,next)=>{

  const{error,value}=patchSchema.validate({title:req.body.title,isCompleted:req.body.isCompleted,id:req.params.id});
  if(error){
    res.json({error:error.message});
  }
  else{
    next();
  }
};