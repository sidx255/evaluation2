
const controller = require("../controllers/controller");
const joivalidation = require("../middlewares/joiMiddleware");
const Router = require("express").Router();

Router.get("/association",controller.checkAssociation);

Router.post("/api/save", controller.saveCompanyDetails);
Router.get("/companies", controller.getAllCompanies);
Router.get("/scores", controller.checkAssociation); // TASK 1
Router.patch("/companies/:id", joivalidation.validatePatch, controller.updateCEO); // TASK 3
Router.get("/sector", controller.getSectors);
Router.get("/rank", controller.getTopCompanies); // TASK 2

// router.post('/api/save', companyControllers.fetchCompanyDataAndStore);
// router.get('/companies', companyControllers.getAllCompanies);

//Router.post("/api/save", controller.save);


module.exports = Router;