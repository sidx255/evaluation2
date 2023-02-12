const scoreCalculator = (performanceIndex) => {
  const scoreObject = {};
  for( let i = 0; i < performanceIndex.length; i++){
    scoreObject[performanceIndex[i].key] = performanceIndex[i].value;
  }
  return ((scoreObject.cpi * 10) + (scoreObject.cf / 10000) + (scoreObject.mau * 10) + scoreObject.roic) / 4;
};

module.exports = { scoreCalculator };