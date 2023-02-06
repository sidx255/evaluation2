const { default: axios } = require("axios");
const csvToJson = require("csvtojson");

const getCsvFileJson = async (urlLink) => {
  const file = await axios({
    method: "GET",
    url: urlLink,
  });

  const jsonData = await csvToJson().fromString(file.data);
  return jsonData;
};

const getCompanyData = async (companyId) => {
  const companyData = await axios({
    method: "GET",
    url: `http://54.167.46.10/company/${companyId}`
  });
  // console.log(companyData.data);
  return companyData.data;
};

// const getSectorData = async (sectorName) => {
//   const sectorData = await axios({
//     method: "GET",
//     url: `http://54.167.46.10/sector?name=${sectorName}`
//   });
//   console.log(sectorData.data);
//   return sectorData.data;
// };

const getSectorData = async (SectorName) => {
  const sectorData = await axios({
    method: "GET",
    url: `http://54.167.46.10/sector?name=${SectorName}`
  });
  //console.log(sectorData.data);
  return sectorData.data;
};

module.exports = {
  getCsvFileJson,
  getCompanyData,
  getSectorData
};