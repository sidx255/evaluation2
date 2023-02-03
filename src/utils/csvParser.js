const csvParser = require("csv-parser");

const parseCSV = async (csv) => {
  const results = [];
  await csvParser(csv, {
    headers: false,
    skipLines: 1,
  })
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
  return results;
};

module.exports = {
  parseCSV
};