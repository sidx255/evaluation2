
const todo = require("../../src/services/service");
const controller = require("../../src/controllers/controller");

describe("To-Do app utilities", () =>
  describe("Create a user", () => {
    it("should list all tasks", async () => {
      jest.spyOn(todo, "getTasks").mockResolvedValue({ id: 1 });
      const mockRes = { send: jest.fn() };
      await controller.getTasks({
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