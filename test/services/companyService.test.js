// const { HttpErrors } = require('../../src/errors/httperror');
const CompanyService = require('../../src/services/companyService');
const { Company } = require('../../src/models');

describe('Company Service', () => {
  describe('Fetching company data by sector', () => {
    it('should return 201', async () => {
      jest.spyOn(CompanyService, 'fetchCompanyDataBySector').mockResolvedValue([{ id: 1 }]);
      const companyData = await CompanyService.fetchCompanyDataBySector();
      expect(companyData).toEqual([{ id: 1 }]);
    });
  });
  // describe('fetchCompanyDataBySector', () => { });
  // describe('updateCompanyData', () => { });

  describe('Saving company data', () => {
    it('should return 201', async () => {
      jest.spyOn(CompanyService, 'saveData').mockResolvedValue([{ id: 1 }]);
      const companyData = await CompanyService.saveData();
      expect(companyData).toEqual([{ id: 1 }]);
    });
  }
  );

  describe('Updating company data', () => {
    it('should return 201', async () => {
      jest.spyOn(CompanyService, 'updateCompanyData').mockResolvedValue([{ id: 1 }]);
      const companyData = await CompanyService.updateCompanyData();
      expect(companyData).toEqual([{ id: 1 }]);
    });
  }
  );



});
