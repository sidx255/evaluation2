
const HTTPError = require("../../src/utils/HTTPError");
const {patchSchema}=require("./schema");

exports.validatePatch=(req,res,next)=>{
  try{
    const{error,value}=patchSchema.validate({ceo:req.body.ceo, companyId:req.params.id});
    if(error){
      res.json({error:error.message});
    }
    else{
      next();
    }
  }  catch (error) {
    if (error instanceof HTTPError) {
      res.status(error.code).json({ message: error.message });
    }
    res.status(400).json(error.toString());
  }
};