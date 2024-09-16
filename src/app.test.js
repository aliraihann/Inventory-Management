import request from "supertest";
import makeApp from "./app";
import { jest } from "@jest/globals";

const getUserByEmail = jest.fn();

const app = makeApp({
  getUserByEmail,
});

describe("POST /register", () => {
  describe("given a employee_name, employee_email, password, role", () => {
    test("should return status code 400 for password less than 8 characters", async () => {
      const response = await request(app).post("/users/register").send({
        employee_name: "testName",
        employee_email: "testEmail@gmail.com",
        password: "pass",
        role: "operator",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty(
        "error",
        "Password must be at least 8 characters long"
      );
    });

    test("should return status code 400 for incorrect email pattern", async () => {
      const response = await request(app).post("/users/register").send({
        employee_name: "testName",
        employee_email: "testEmail@gmail",
        password: "pass124563",
        role: "operator",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty(
        "error",
        "Email parameter is not in the correct format"
      );
    });

    // still in works
    // test("should return an error for email already in use", async () => {
    //   await request(app).post("/users/register").send({
    //     employee_name: "Test User",
    //     employee_email: "existingEmail@example.com",
    //     password: "strongPassword",
    //     role: "admin",
    //   });

    //   expect(getUserByEmail.mock.calls.length).toBe(1);
    //   expect(response.body.error).toContain("Email has already been used");
    // });

    // test("should respon with a status code 201", async () => {
    //   const response = await request(app).post("/users/register").send({
    //     employee_name: "testName",
    //     employee_email: "testEmail@gmail.com",
    //     password: "pass12345678",
    //     role: "operator",
    //   });
    //   expect(response.statusCode).toBe(201);
    // });

    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/users/register").send({
        employee_name: "testName",
        employee_email: "testEmail@gmail.com",
        password: "pass12345678",
        role: "operator",
      });
      expect(response.header["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("should respon with json with new user object", async () => {
      const response = await request(app).post("/users/register").send({
        employee_name: "testName",
        employee_email: "testEmail@gmail.com",
        password: "pass12345678",
        role: "operator",
      });
      expect(response.body).toHaveProperty("employee_name");
      expect(response.body).toHaveProperty("employee_email");
      expect(response.body).toHaveProperty("role");
    });
  });
});
