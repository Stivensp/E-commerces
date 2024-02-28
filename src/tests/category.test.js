const request = require("supertest");
const app = require("../app");


const base_url = "/category";

const category = {
    name:'Ropa',
}
let categoryid
let TOKEN
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

test("POST -> 'URL BASE', should return status code 201", async () => {
    const res = await request(app)
        .post(base_url)
        .send(category)
        .set("Authorization", `Bearer ${TOKEN}`)

        categoryid = res.body.id

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(category.name);
});


test("GET -> 'URL BASE', should return status code 200", async () => {
const res = await request(app)
.get(base_url)

expect(res.statusCode).toBe(200);
expect(res.body).toBeDefined();
expect(res.body).toHaveLength(1);

})


test("DELETE -> 'URL BASE', should return status code 204", async () => {
const res = await request(app)
.delete(base_url+"/"+categoryid)
.set("Authorization", `Bearer ${TOKEN}`)
expect(res.statusCode).toBe(204);
expect(res.body).toBeDefined();
})