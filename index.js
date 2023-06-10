const express = require("express")
const crypto = require("crypto")
const app = express() // 產生 Express Application 物件
const PORT = 5002

const users = [
    {
        "id": crypto.randomUUID(),
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "admin",
    },
    {
        "id": crypto.randomUUID(),
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "role": "user",
    },
    {
        "id": crypto.randomUUID(),
        "name": "Mike Doe",
        "email": "mike.doe@example.com",
        "role": "user",
    },
    {
        "id": crypto.randomUUID(),
        "name": "Mike Doe",
        "email": "mike.doe@example.com",
        "role": "user",
    }
]

// use MIDDLEWARE for app.post using to convert body to json
app.use(express.json())

//  / 這個科線等同於 http://localhost:3000的"/"斜線
app.get("/", (req, res) => {
    // req 參數是 HTTP 請求的資訊 (Incoming data, we're getting it)
    // res 參數是 HTTP 回應的資訊 (Outgoing data, we want to send back to the client)
    //  當使用者連線到伺服器的根目錄(/)時，做出回應
    res.status(200).send("Hello <b>World</b>!")
})

app.get("/users", (req, res) => {
    res.status(200).send(JSON.stringify(users))
})

app.get("/users/:userId", (req, res) => {
    // Access userId via: req.params.userId
    const result = users.find(user => user.id === req.params.userId)
    // 回傳訊息到客戶端
    if (result) return res.status(200).send(result)

    // 回傳 404 訊息到客戶端
    return res.status(404).send("User not found!")
})

app.post("/users", (req, res) => {
    const newUser = {
        id: crypto.randomUUID(),
        ...req.body
    }
    const isUserExisted = users.find(user => user.email === newUser.email)
    if (isUserExisted) return res.status(400).send({message: "Added Failed. User already existed!"})

    users.push(newUser)
    return res.status(200).send({message: "User added successfully!", user: newUser})
})

app.listen(PORT, () => {
    console.log(`伺服器已經啟動在 http://localhost:${PORT}/`)
})