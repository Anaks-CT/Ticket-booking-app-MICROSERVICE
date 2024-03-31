import request from "supertest";
import { app } from "../../app";

it("returns 200 when signed out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  const res = await request(app).post("/api/users/signout").send().expect(200);
  expect(res.header["set-cookie"][0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
});
