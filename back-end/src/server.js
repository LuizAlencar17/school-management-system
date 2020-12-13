import UserController from './app/controllers/UserController';
import ClassController from './app/controllers/ClassController';
import express from 'express';

const app = express();
const router = express.Router();

//API configuration to accept GRUD requests
app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/login', UserController.login);
app.get('/list-users', UserController.listAllUsers);
app.post('/register-user', UserController.register);
app.post('/get-class-by-user', UserController.getClassByUser);
app.post('/link-student-to-a-class', UserController.linkStudentToClass);
app.post('/get-class-information-from-teacher', ClassController.getClassInformationFromTeacher);
app.post('/create-class', ClassController.createClass);
app.post('/delete-class', ClassController.deleteClass);

app.use(router);

app.listen(8000, function () {
  console.log('Ready');
});