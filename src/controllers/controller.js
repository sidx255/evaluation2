
const service = require("../services/service");
const db = require("../models");
const HTTPError = require("../utils/httpError");

const saveCompanyDetails = async (req, res) => {
  try {
    const { urlLink } = req.body;
    const csvJsonData = await service.getCsvData(urlLink);
    const allCompanyData = csvJsonData.map((company) => {
      const companyData = service.addCompanyData(company);
      return companyData;
    });
    res.status(200).json(allCompanyData);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({
        message: err.message,
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
};

const getSectors = async (req, res) => 
{
  try{
    const sectorData = service.addSectorDetails(req.query.params);
    res.status(200).json(sectorData);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({
        message: err.message,
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
};

const checkAssociation=async(req,res)=>{
  try{
    const result=await service.getBoth();
    res.send(result);
  }
  catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({
        message: err.message,
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
};

const getAllScores = async (req, res) => {
  try {

    const allScores = await service.getAllScores();
    res.status(200).json(allScores);

  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({
        message: err.message,
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const allCompanies = await db.companies.findAll();
    // return allCompanies;
    res.status(200).json(allCompanies);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({
        message: err.message,
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
};

const updateCEO = async (req, res) => {
  try {
    await service.updateCEO(req.params.id, req.body.ceo);
    res.status(200).json({
      message: "CEO updated successfully",
    });
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({
        message: err.message,
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
};

module.exports = {
  saveCompanyDetails,
  getAllCompanies,
  getSectors,
  checkAssociation,
  getAllScores,
  updateCEO
};