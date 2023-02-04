
const controller = require("../controllers/controller");
const Router = require("express").Router();

Router.get("/association",controller.checkAssociation);

Router.post("/api/save", controller.saveCompanyDetails);
Router.get("/companies", controller.getAllCompanies);
Router.patch("/companies/:id", controller.updateCEO);
Router.get("/sector", controller.getSectors);

// router.post('/api/save', companyControllers.fetchCompanyDataAndStore);
// router.get('/companies', companyControllers.getAllCompanies);

//Router.post("/api/save", controller.save);


module.exports = Router;