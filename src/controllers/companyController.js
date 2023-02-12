const companyService = require('../services/companyService');
const HTTPErrors = require('../errors/HTTPErrors');

const saveData = async (req, res) => {
  try {
    // console.log('saveData controller called')
    const url = req.body.urlLink;
    if (url.length === 0) throw new HTTPErrors('Url is required', 400);
    res.status(201).json(await companyService.saveData(url));
  } catch(err) {
    if (err instanceof HTTPErrors) {
      res.status(err.code).json({ 'message': err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

const fetchCompanyDataBySector = async (req, res) => {
  try {
    // console.log('fetchCompanyData controller called')
    const sector = req.query.sector;
    if (sector == null) throw new HTTPErrors('Sector is required', 400);
    const topCompanies = await companyService.fetchCompanyDataBySector(sector);
    res.status(200).json(topCompanies);
  } catch(err) {
    if (err instanceof HTTPErrors) {
      res.status(err.code).json({ 'message': err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

const updateCompanyData = async (req, res) => {
  try {
    // console.log('updateCompanyData controller called')
    const companyId = req.params.companyId;
    if (companyId == null) throw new HTTPErrors('companyId is required', 400);
    res.status(200).json(await companyService.updateCompanyData(companyId, req.body));
  } catch(err) {
    if (err instanceof HTTPErrors) {
      res.status(err.code).json({ 'message': err.message });
    }
    res.status(500).json({ message: err.message });
  }
    
};

module.exports = { saveData, 
  fetchCompanyDataBySector, 
  updateCompanyData };