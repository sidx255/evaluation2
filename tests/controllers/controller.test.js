//test for companyController.js

// const { jest, describe, it, expect } = require('@jest/globals');
const companyControllers = require("../../src/controllers/controller");
const companyServices = require("../../src/services/service");
const externalApi = require("../../src/utils/extAPI");

describe("Testing Company Controller", () => {
  describe("company score fetch and store", () => {
    it("Should give success message on fetching and storing", async () => {
      const mockReq = {
        body: {
          urlLink: "something",
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(companyServices, "getCsvData").mockResolvedValue("something");
      jest.spyOn(externalApi, "getAllSectors").mockResolvedValue("something");
      await companyControllers.fetchCompanyScoreAndStore(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
        message: "scores fetched and updated in db",
      });
    });
    it("Should give 500 error message", async () => {
      const mockReq = {
        body: {
          urlLink: "something",
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(companyServices, "getCsvData").mockRejectedValue("something");
      jest.spyOn(externalApi, "getAllSectors").mockRejectedValue("something");
      await companyControllers.fetchCompanyScoreAndStore(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        message: "Something went wrong",
      });
    });
  });
  
  it("Should give 500 error message", async () => {
    const mockResult = [
      {
        "companyId": "46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc"
      }
    ];
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(companyServices, "getAllCompanies").mockRejectedValue(mockResult);
    await companyControllers.getAllCompanies(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      message: "Something went wrong",
    });
  });
});