const companyRouter = require('express').Router();

const { saveData, fetchCompanyDataBySector, updateCompanyData } = require('../controllers/companyController');
const { saveDataValidator, updateDataValidator } = require('../middleware/companyValidator');

companyRouter.post('/api/save', saveDataValidator, saveData);
companyRouter.get('/api/companies', fetchCompanyDataBySector);
companyRouter.patch('/api/company/:companyId', updateDataValidator, updateCompanyData);

module.exports = companyRouter;