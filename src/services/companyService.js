
const fetchCompanyPerformance = require ('../utils/serviceUtils').fetchCompanyPerformance;
const fetchCompanyDetails = require ('../utils/serviceUtils').fetchCompanyDetails;

const { Company } = require('../models');

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