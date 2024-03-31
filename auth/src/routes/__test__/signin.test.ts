import request from "supertest";
import { app } from "../../app";

it("returns a 200 on successful signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);
});

it("returns a 400 if the password doesn't match", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
  
    return request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "wrongpassword",
      })
      .expect(400);
  });

it("returns a 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com" })
    .expect(400);

  await request(app)
    .post("/api/users/signin")
    .send({ password: "password" })
    .expect(400);

  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("returns a 400 if its not an existing user", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});


it("sets a cookie after a successful signup", async () => {
    await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
    
    const res = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(200);
  
    expect(res.header["set-cookie"]).toBeDefined();
    // we can also write this way
  //   expect(res.get('Set-Cookie')).toBeDefined();
  });