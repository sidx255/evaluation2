
const service = require("../../src/services/service");
const controller = require("../../src/controllers/controller.js");

describe("To-Do app utilities", () =>
  describe("Create a user", () => {
    it("should list all companies", async () => {
      jest.spyOn(service, "getAllCompanies").mockResolvedValue({ id: 1 });
      const mockRes = { send: jest.fn() };
      await controller.getAllCompanies({
        body: {
          id: 12,
          isComplete: false,
          name: "test"
        },
      }, mockRes);
      expect(mockRes.send).toBeCalledWith({ id: 1 });
    });
  })
);

