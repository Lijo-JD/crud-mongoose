const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/crud-mongoose', { useNewUrlParser: true, useUnifiedTopology: true  })

mongoose.connection.on('open', () => {
  console.log('Connected to database')
})

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

const userSchema = mongoose.Schema({
  'firstname': {type: String, required: true},
  'lastname': {type: String, required: true},
  'email': {type: String, required: true},
  'phone': {type: String, required: true}
})

const userModel = mongoose.model('user', userSchema)

app.get('/user', async(req, res) =>{
  let users = await userModel.find().exec()
  res.json(users)
})

app.get('/user/:id', async(req, res) => {
  let user = await userModel.findById(req.params.id).exec()
  res.json(user)
})

app.post('/user', async(req, res) => {
  let user = new userModel(req.body)
  let result = await user.save()
  res.json(result)
})

app.put('/user/:id', async(req, res) => {
  let user = await userModel.findById(req.params.id).exec()
  user.set(req.body)
  let result = await user.save()
  res.json(result)
})

app.delete('/user/:id', async(req, res) => {
  let result = await userModel.findByIdAndDelete(req.params.id).exec()
  res.json(result)
})

app.listen(3000, () => {
  console.log("Server listening on port 3000")
})
