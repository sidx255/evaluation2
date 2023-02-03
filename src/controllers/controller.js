
const service = require("../services/service");
const db = require("../models");

const save = async (req, res) => {
  const { urlLink } = req.body;
  const csvJsonData = await service.getCsvData(urlLink);
  const allCompanyData = csvJsonData.map((company) => {
    const companyData = service.addCompanyData(company);
    return companyData;
  });
  res.status(200).json(allCompanyData);
};

const getSectors = async (req, res) => 
{
  const sectorData = service.addSectorDetails();
  res.status(200).json(sectorData);
};


const getAllCompanies = async (req, res) => {
  const allCompanies = await db.companies.findAll();
  // return allCompanies;
  res.status(200).json(allCompanies);
};

module.exports = {
  save,
  getAllCompanies,
  getSectors
};