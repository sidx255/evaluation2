
const controller = require("../controllers/controller");
const Router = require("express").Router();

Router.post("/api/save", controller.save);

// router.post('/api/save', companyControllers.fetchCompanyDataAndStore);
// router.get('/companies', companyControllers.getAllCompanies);

module.exports = Router;