const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')


const app = express();
app.use(cors())
app.use(express.json())


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/employee');
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const userModel = mongoose.model('user', userSchema)


app.post('/login', (req, res) => {
    const { name, email, password } = req.body
    bcrypt.hash(password, 10)
        .then(hash => {
            userModel.create({ name, email, password: hash })
                .then(data => res.json(data))
                .catch(err => console.log(err))
        })
        .catch(err => res.json(err))
})

app.listen(5500, () => {
    console.log("server iss running")
})