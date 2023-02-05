
const controller = require("../../src/controllers/controller");
const service = require("../../src/services/service");
const extAPI = require("../../src/utils/extAPI");

describe("Testing Company Controller", () => {
  describe("Check if companies are ranked", () => {
    it("Should give company ranks per sector when passed", async () => {
      jest.spyOn(service, "getTopCompanies").mockResolvedValue(
        {
          "data": [
            {
              "id": "46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc",
              "name": "Apple",
              "ceo": "SiddharthSharma",
              "score": 29.987724999999998,
              "ranking": 1
            },
            {
              "id": "8727cc61-8c4b-4285-8853-2db808392c04",
              "name": "Google",
              "ceo": "Lester Mann",
              "score": 13.27365,
              "ranking": 2
            },
            {
              "id": "e90a7bc7-47fa-49af-bfa1-391fe7768b56",
              "name": "Meta",
              "ceo": "Ellen Price",
              "score": 13.102174999999999,
              "ranking": 3
            },
            {
              "id": "b6472c52-732a-4fd2-a463-ae604c0a2c79",
              "name": "Microsoft",
              "ceo": "Grace Lemke IV",
              "score": 21.3221,
              "ranking": 4
            }
          ]
        }
      );
      
      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
    
      await controller.getTopCompanies({
        query: {
          sector: "Software",
        }}, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith( {
        "data": [
          {
            "id": "46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc",
            "name": "Apple",
            "ceo": "SiddharthSharma",
            "score": 29.987724999999998,
            "ranking": 1
          },
          {
            "id": "8727cc61-8c4b-4285-8853-2db808392c04",
            "name": "Google",
            "ceo": "Lester Mann",
            "score": 13.27365,
            "ranking": 2
          },
          {
            "id": "e90a7bc7-47fa-49af-bfa1-391fe7768b56",
            "name": "Meta",
            "ceo": "Ellen Price",
            "score": 13.102174999999999,
            "ranking": 3
          },
          {
            "id": "b6472c52-732a-4fd2-a463-ae604c0a2c79",
            "name": "Microsoft",
            "ceo": "Grace Lemke IV",
            "score": 21.3221,
            "ranking": 4
          }
        ]
      });
    });
    // const mockReq = {
    //   body: {
    //     urlLink: "something",
    //   }
    // };
    // const mockRes = {
    //   status: jest.fn().mockReturnThis(),
    //   json: jest.fn(),
    // };
    // jest.spyOn(service, "getCsvData").mockResolvedValue("something");
    // jest.spyOn(extAPI, "getAllSectors").mockResolvedValue("something");
    // await controller.fetchCompanyScoreAndStore(mockReq, mockRes);
    // expect(mockRes.status).toBeCalledWith(200);
    // expect(mockRes.json).toBeCalledWith({
    //   message: "scores fetched and updated in db",
    // });
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
    jest.spyOn(service, "getCsvData").mockRejectedValue("something");
    jest.spyOn(extAPI, "getAllSectors").mockRejectedValue("something");
    await controller.fetchCompanyScoreAndStore(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      message: "Something went wrong",
    });
  });
});
