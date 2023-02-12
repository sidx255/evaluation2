const CSVToJSON = require('csvtojson');

const { Company } = require('../models');
const { scoreCalculator } = require('../utils/scoreCalculator');

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


const saveData = async (url) => {
  const companyDetailsResponse = await fetchCompanyDetails(url);
  const companyPerformance = await fetchCompanyPerformance();
  for (let company of companyPerformance) {
    await Company.update(
      { companyPerformance: company.companyScore },
      { where: { companyId: company.companyId } }
    );
  }
  return { companyDetails: companyDetailsResponse, companyPerformance: companyPerformance };

};

const fetchCompanyDataBySector = async (sector) => {
  const companyData = await Company.findAll({
    where: {
      companySector: sector
    },
    order: [['companyPerformance', 'DESC']]
  });
  const topRankedCompanies = companyData.map((item,i)=>{
    console.log(item);
    return {'companyId':item.companyId,
      'companyName':item.companyName,
      'companyCEO':item.companyCEO,
      'companyPerformance':item.companyPerformance,
      'Ranking':i+1
    };
  });

  return topRankedCompanies.sort((element1,element2)=>{
    if(element1.companyPerformance>element2.companyPerformance){
      return -1;
    }
  });
};

const updateCompanyData = async (companyId, updateBody) => {
  const company = await Company.update(updateBody, {
    where: {
      companyId: companyId
    },
    returning: true,
  });
  return company;
};


module.exports = { saveData, 
  fetchCompanyDataBySector, 
  updateCompanyData };