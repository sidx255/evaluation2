
const Company = require('../models');
const { scoreCalculator } = require('../utils/scoreCalculator');
const CSVToJSON = require('csvtojson');

const fetchCompanyDetails = async (url) => {
  const response = await fetch(url, {
    method: 'GET'
  });
  const data = await response.text();
  const json = await CSVToJSON().fromString(data);
  const companyDetails = [];
  for (let company of json) {
    const url = process.env.COMPANY_URL+company.company_id;
    const companyInfo = await (await fetch(url, {
      method: 'GET'
    })).json();
      // // console.log(companyInfo)
    companyDetails.push({
      companyId: company.company_id,
      companySector: company.company_sector,
      companyName: companyInfo.name,
      companyCEO: companyInfo.ceo,
      companyTags: companyInfo.tags
    });
  }
  return await Company.bulkCreate(companyDetails);
};

const fetchCompanyPerformance = async () => {
  const companyPerformance = [];
  const sectors = await Company.findAll(
    {
      attributes: ['companySector'],
      group: ['companySector']
    },
    {
      fields: ['companySector']
    }
  );
  for (let sector of sectors) {
    if (!sector.companySector) continue;
    const url = process.env.SECTOR_URL+sector.companySector;
  
    const response = await (await fetch(url, {
      method: 'GET'
    })).json();
    for (let company of response) {
      companyPerformance.push({
        companyId: company.companyId,
        companyScore: scoreCalculator(company.performanceIndex),
      });
    }
  }
  return companyPerformance;
};


module.exports = { 
  fetchCompanyDetails, 
  fetchCompanyPerformance };