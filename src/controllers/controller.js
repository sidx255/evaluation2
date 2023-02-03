
const service = require("../services/service");
const db = require("../models");

const saveCompanyDetails = async (req, res) => {
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

const checkAssociation=async(req,res)=>{
  const result=await service.getBoth();
  res.send(result);
};


const getAllCompanies = async (req, res) => {
  const allCompanies = await db.companies.findAll();
  // return allCompanies;
  res.status(200).json(allCompanies);
};

module.exports = {
  saveCompanyDetails,
  getAllCompanies,
  getSectors,
  checkAssociation  
};