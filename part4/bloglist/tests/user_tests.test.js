const app = require("../app")
const supertest = require("supertest")
const mongoose = require("mongoose")
const User = require("../models/User")

const initialUsers = [
    {
        username: "pika",
        password: "IlikeTo3letricutestuff",
        name: "pikachu"
    },
    {
        username: "Bulba",
        password: "IlikeToWhi5stuff",
        name: "Bulbasaur"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    for (let user of initialUsers) {
        let newUser = new User(user)
        await newUser.save()
    }
})

const api = supertest(app)

test("users: list is returned as JSON", async () => {
    await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("Status 400 is returned when a password or username is not provided", async () => {
    const noUsername = {
        password: "IlikeTo3letricutestuff",
        name: "pikachu"
    }
    await api.post("/api/users").send(noUsername).expect(400)
    const noPassword = {
        username: "blabla",
        name: "pikachu"
    }
    await api.post("/api/users").send(noPassword).expect(400)
})

test("Status 400 is returned when a password or username are not of length at least 3", async () => {
    const usernameLength = {
        username: "ab",
        password: "IlikeTo3letricutestuff",
        name: "pikachu"
    }
    await api.post("/api/users").send(usernameLength).expect(400)
    const passwordLength = {
        username: "blabla",
        password: "bi",
        name: "pikachu"
    }
    await api.post("/api/users").send(passwordLength).expect(400)
})

test("Status 400 is returned when username is not unique", async () => {
    const notUnique = {
        username: "pika",
        password: "IlikeTo3letricutestuffz",
        name: "pikachu"
    }
    await api.post("/api/users").send(notUnique).expect(400)
})

test("User is not created when an error is returned", async () => {
    const notUnique = {
        username: "pika",
        password: "IlikeTo3letricutestuffz",
        name: "pikachu"
    }
    await api.post("/api/users").send(notUnique).expect(400)
    const list = await api.get("/api/users").expect(200)
    expect(list.body).toHaveLength(2)
})

afterAll(() => mongoose.connection.close())