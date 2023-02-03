


const services = require("../../src/services");
const controller = require("../../src/controllers");
const db = require("../../datnpabase/models");

describe("Testing Model: companies", () => {
  it("should return all companies", async () => {
    jest.spyOn(db.companies, "findAll").mockResolvedValue([{
      id: 1,
      title: "companies1",
      isCompleted: false
    },
    {
      id: 2,
      title: "companies2",
      isCompleted: false
    }]);
      
    const result  = await services.getAllCompanies();
    expect(result).toEqual([{
      id: 1,
      title: "companies1",
      isCompleted: false
    },
    {
      id: 2,
      title: "companies2",
      isCompleted: false
    }]);
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