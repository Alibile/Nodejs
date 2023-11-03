const request = require("supertest");
const app = require("../../app");
const {mongoConnect,mongoDisConnect} = require("../../services/mongo")
describe("Launches API ",()=> {
  beforeAll(async() => {
    await mongoConnect()
  })
  afterAll(async() => {
    await mongoDisConnect()
  })
  describe("Test GET / launches", () => {
    test("It should response with 200 success", async () => {
      const response = await request(app)
        .get("/launches")
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });
  describe("Test POST / launches", () => {
    const completeLaunchData = {
      mission: "Kepler Exploration X",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "January 4, 2028",
    };
    const launchDataWithoutDate = {
      mission: "Kepler Exploration X",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
    };
    const launchDataWithInvalidDate = {
      mission: "Kepler Exploration X",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "zoot",
    }
    test("It should response with 201 created", async () => {
      const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);
      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });
    test("It should catch missing required properties", async () => {
      const response = await request(app)
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400);
  
      expect(response.body).toStrictEqual({
          error: 'Missing requered launch property'
      });
    });
    test("It should catch invalid dates", async() => {
      const response = await request(app)
      .post('/launches')
      .send(launchDataWithInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400);
  
      expect(response.body).toStrictEqual({
          error: 'Invalid launch Date'
      });
    });
  });
})
