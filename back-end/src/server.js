import UserController from './app/controllers/UserController';
import express from 'express';

const app = express()
const router = express.Router()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/login', UserController.login)

app.use(router)

app.listen(8000, function () {
  console.log('Ready')
})
