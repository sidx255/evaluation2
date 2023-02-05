
const services = require("/../../src/services");
const controller = require("/../../src/controller");
const db = require("/../../database/models");
const extAPI = require("/../../src/utils/extAPI");
//test for companyController.js

// const { jest, describe, it, expect } = require('@jest/globals');

describe("Company Services", () => {
  describe("Get CSV Data", () => {
    it("Should give correct data", async () => {

      jest.spyOn(extAPI, "getCsvFileJson").mockResolvedValue("something");
      const data = await services.getCsvData("some link");
      expect(data).toBe("something");
    });
    it("Should give 404 error message", async () => {
      jest.spyOn(extAPI, "getCsvFileJson").mockResolvedValue(null);
      expect(() => services.getCsvData("some link")).toThrow(HTTPError);
    });

  });
  describe("Get all companies", () => {
    it("Should give all companies", async () => {
      const mockResult = [
        {
          "id": 4,
          "companyId": "46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc",
          "companyName": "Apple",
          "score": 29.987724999999998,
          "sector": "Software",
          "createdAt": "2023-02-03T09:07:18.970Z",
          "updatedAt": "2023-02-03T09:07:18.970Z"
        },
        {
          "id": 7,
          "companyId": "b6472c52-732a-4fd2-a463-ae604c0a2c79",
          "companyName": "Microsoft",
          "score": 21.3221,
          "sector": "Software",
          "createdAt": "2023-02-03T09:07:19.483Z",
          "updatedAt": "2023-02-03T09:07:19.483Z"
        },
      ];
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(services, "getAllCompanies").mockResolvedValue(mockResult);
      await controller.getAllCompanies(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
  });
  it("Should give 500 error message", async () => {
    const mockResult = [
      {
        "id": 4,
        "companyId": "46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc",
        "companyName": "Apple",
        "score": 29.987724999999998,
        "sector": "Software",
        "createdAt": "2023-02-03T09:07:18.970Z",
        "updatedAt": "2023-02-03T09:07:18.970Z"
      }
    ];
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(services, "getAllCompanies").mockRejectedValue(mockResult);
    await controller.getAllCompanies(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      message: "Something went wrong",
    });
  });
  describe("Get all Scores", () => {
    it("Should give all scores", async () => {
      const mockResult = [
        {
          "id": 51,
          "companyId": "e90a7bc7-47fa-49af-bfa1-391fe7768b56",
          "companyName": "Meta",
          "score": 13.102174999999999,
          "sector": "Software",
          "createdAt": "2023-02-03T09:24:53.144Z",
          "updatedAt": "2023-02-03T09:24:53.144Z"
        }
      ];
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(services, "getAllScores").mockResolvedValue(mockResult);
      await controller.getAllScores(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
    it("Should give 500 error message", async () => {
      const mockResult = [
        {
          "id": 51,
          "companyId": "e90a7bc7-47fa-49af-bfa1-391fe7768b56",
          "companyName": "Meta",
          "score": 13.102174999999999,
          "sector": "Software",
          "createdAt": "2023-02-03T09:24:53.144Z",
          "updatedAt": "2023-02-03T09:24:53.144Z"
        }
      ];
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(services, "getAllScores").mockRejectedValue(null);
      await controller.getAllScores(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        message: "Something went wrong",
      });
    });
  });
  describe("Get company scores in sectors", () => {
    it("Should give scores of company", async () => {
      const mockResult = [
        {
          "id": 51,
          "companyId": "e90a7bc7-47fa-49af-bfa1-391fe7768b56",
          "companyName": "Meta",
          "score": 13.102174999999999,
          "sector": "Software",
          "createdAt": "2023-02-03T09:24:53.144Z",
          "updatedAt": "2023-02-03T09:24:53.144Z"
        }
      ];
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(services, "getCompanyScoresInSector").mockResolvedValue(mockResult);
      await controller.getCompanyScoresInSector(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
    it("Should give 500 error", async () => {
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(services, "getCompanyScoresInSector").mockRejectedValue(null);
      await controller.getCompanyScoresInSector(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        message: "Something went wrong",
      });
    });
  });
  describe("Update company CEO", () => {
    it("Should give scores of company", async () => {
      const mockReq = {
        body: {
          ceoName: "khushil",
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(services, "updateCompanyCeo").mockResolvedValue(2);
      await controller.updateCompanyCeo(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
    it("Should give 500 error", async () => {
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(services, "updateCompanyCeo").mockRejectedValue(null);
      await controller.updateCompanyCeo(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        message: "Something went wrong",
      });
    });
  });
});

// describe("get todo with id", () => {
//   it("should return a todo wit id", async () => {
//     jest.spyOn(db.companies, "findAll").mockResolvedValue([{
//       id: 1,
//       title: "companies1",
//       isCompleted: false
//     },
//     {
//       id: 2,
//       title: "companies2",
//       isCompleted: false
//     }]);

//     const mockreq = {where:{id:1}};
      
//     const result  = await services.getAllcompaniesFromDb(mockreq);
//     expect(result).toEqual([{
//       id: 1,
//       title: "companies1",
//       isCompleted: false
//     },
//     {
//       id: 2,
//       title: "companies2",
//       isCompleted: false
//     }]);
//   });
// });
  
// describe("post todo ", () => {
//   it("should post a todo with", async () => {
//     jest.spyOn(db.companies, "create").mockResolvedValue({
//       id: 3,
//       title: "companies3",
//       isCompleted: false
//     });

//     const mockreq = {body:{
//       id: 3,
//       title: "companies3",
//       isCompleted: false
//     }};
      
//     const result  = await services.postTodoToDb(mockreq);
//     expect(result).toEqual({
//       id: 3,
//       title: "companies3",
//       isCompleted: false
//     });
//   });
// });
  
// describe("delete todo ", () => {
//   it("should delete a todo with", async () => {
//     jest.spyOn(db.companies, "destroy").mockResolvedValue(1);

//     const mockreq = {params:{
//       id: 2,
//     }};
      
//     const result  = await services.deleteTodoFromDb(mockreq);
//     expect(result).toEqual(1);
//   });
// });


// describe("update todo ", () => {
//   it("should update a todo with", async () => {
//     jest.spyOn(db.companies, "update").mockResolvedValue([1]);

//     const mockreq = {body:{title:"companiesnext"},params:{
//       id: 2,
//     }};
      
//     const result  = await services.patchTodoByIdFromDb(mockreq);
//     expect(result).toEqual([1]);
//   });
// });