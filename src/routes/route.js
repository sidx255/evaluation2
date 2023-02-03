
const controller = require("../controllers/controller");
const Router = require("express").Router();

Router.post("/api/save", controller.save);
Router.get("/companies", controller.getAllCompanies);
Router.get("/sector", controller.getSectors);

// router.post('/api/save', companyControllers.fetchCompanyDataAndStore);
// router.get('/companies', companyControllers.getAllCompanies);

//Router.post("/api/save", controller.save);


module.exports = Router;