const request = require("supertest");
const app = require("../app");

let TOKEN;

const user = {
            firstName:'Luis',
            lastName:'Gonzalez',
            email:'luis@luis',
            password:'luis123',
            phone: '123456789'
}
beforeAll(async () => {
    const user= {
        email: "luis@luis",
        password: "luis123"
    }
    const res = await request(app)
    .post("/users/login")
    .send(user)
    
    TOKEN = res.body.token
    console.log(TOKEN)
});


test("GET -> 'URL BASE', should return status code 200, res.body to be defined", async () => {
  
    const res = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${TOKEN}`)
     
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});



test("POST -> 'URL BASE', should return status code 201, res.body to be defined and res.body.firstname === user.firstname", async () => {
  
    const res = await request(app)
        .post("/users")
        .send(user);
     
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
});

test("PUT -> 'URL BASE', should return status code 200, res.body to be defined and res.body.firstname === user.firstname", async () => {
    const res = await request(app)
        .put("/users/1")
        .send({firstName: "Luis"})
        .set("Authorization", `Bearer ${TOKEN}`)
     
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe("Luis");
});

test("post -> 'URL BASE', should return status code 200, res.body to be defined and res.body.firstname === user.firstname", async () => {
    const userLogin={
        email: "luis@luis",
        password: "luis123"
    }

    const res = await request(app)
     .post("/users/login")
     .send(userLogin)

     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.user.email).toBe(userLogin.email)
     expect(res.body.token).toBeDefined()
});


test("post -> 'URL BASE', should return status code 401, res.body to be defined and res.body.password should be invalid", async () => {
    const userLogin={
        email: "luis@luis",
        password: "luis12565"
    }

    const res = await request(app)
     .post("/users/login")
     .send(userLogin)

     expect(res.statusCode).toBe(401)
  
});

test("Delete -> url base, should return status code 204, res.body to be undefined", async () => {
    const res = await request(app)
        .delete("/users/1")
        .set("Authorization", `Bearer ${TOKEN}`)
     
    expect(res.statusCode).toBe(204);

})