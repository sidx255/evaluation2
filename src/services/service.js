


const { getCsvFileJson, getCompanyData } = require("../utils/extAPI");
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

module.exports = {
  getCsvData,
  addCompanyData,
};