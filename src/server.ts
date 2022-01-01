import express from 'express'

const app = express()

app.get('/', (request, response) => {
    return response.json({
        msg: "Hello world !"
    })
})

app.listen(3000, () => console.log("Server is running"))