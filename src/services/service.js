
const { getCsvFileJson, getCompanyData, getSectorData } = require("../utils/extAPI");
const db = require("../models");

const getCsvData = async (urlLink) => {
  const csvJsonData = await getCsvFileJson(urlLink);
  return csvJsonData;
};


const addCompanyData = async (companyData) => {
  const fetchedCompanyData = await getCompanyData(companyData.company_id);
  const newCompanyData = {
    companyId: fetchedCompanyData.id,
    name: fetchedCompanyData.name,
    description: fetchedCompanyData.description,
    ceo: fetchedCompanyData.ceo,
    tags: fetchedCompanyData.tags[0],
  };
  const data = await db.companies.create(newCompanyData);
  return data;
};

const addSectorDetails = async (param) => {
  const fetchedCompanyData = await getSectorData(param);
  const newSectorData = fetchedCompanyData.map(sector => {
    return {
      companyId: sector.companyId,
      score: (((sector.performanceIndex[0].value * 10) + 
      (sector.performanceIndex[1].value / 10000) + 
      (sector.performanceIndex[2].value * 10) + 
      sector.performanceIndex[3].value) / 4)
    };
  });
  const data = await db.sectors.bulkCreate(newSectorData);
  return data;
};

const getBoth = async()=>{
  return await db.sectors.findAll({
    include:db.companies
  });
};

const getAllScores = async () => {
  const allScores = await db.companies.findAll({
    order: ["score", "DESC"],
  });
  return allScores;
};

module.exports = {
  getCsvData,
  addCompanyData,
  addSectorDetails,
  getBoth,
  getAllScores
};