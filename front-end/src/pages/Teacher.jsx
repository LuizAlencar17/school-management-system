import React from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import '../components/css/Student.css';
import '../components/css/Teacher.css';

export default class Teacher extends React.Component {
    constructor(props) {
      var decoded = jwt.verify(localStorage.getItem('token'), process.env.REACT_APP_ACCESS_TOKEN);
      super(props);
      this.state = {
        informationClass: [{}],
        decodedUser: decoded.user,
        emailForNewStudent: '',
      };
      this.getClassInformation();
    }
    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    }
    async addNewStudent (idclass) {
      console.log(this.state.emailForNewStudent)
      var data = await axios.post(process.env.REACT_APP_URL+'/link-student-to-a-class', {
        idclass: idclass,
        email: this.state.emailForNewStudent
      });
      window.location.replace("/teacher");
    }
    async addNewClass () {
      
    }
    openModal (idclass) {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      
    }
    closeModal () {
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
    }
    async getClassInformation () {
      var data = await axios.post(process.env.REACT_APP_URL+'/get-class-information-from-teacher', {
        idteacher: this.state.decodedUser.iduser
      });
      this.setState({informationClass: data.data});
    }
    render() {
      function checkStudents(students) {
        try{
          return <>
          {
            students.map(row => (
              <tr className="tr-end">
                <th>{row.name}</th>
                <th>{row.email}</th>
                <th>{row.evaluation1}</th>
                <th>{row.evaluation2}</th>
                <th>{row.evaluation3}</th>
              </tr>
            ))
          }
          <tr className="tr-end">
            <th>..</th>
            <th>..</th>
            <th>..</th>
            <th>..</th>
            <th>..</th>
          </tr>
          </>
        }catch(e){

        }
      }
      return (
          <>
            <div className="header">
                <a href="https://syncfiddle.net/fiddle/-MNAxG-dijOti95K1o3b" className="logo"><b>ODUS SYSTEM</b></a>
            </div>
            <h1 className="name">Hello, {this.state.decodedUser.name}! </h1>
            <button className="button" onClick={() => this.addNewClass()}><span>Add Class</span></button>
            {
              this.state.informationClass.map(row => (
              <div id={row.idclass}>
                <h1 className="title">{row.name}</h1>
                <table>
                <tr className="column">
                    <th>Student</th>
                    <th>Email</th>
                    <th>Evaluation 1</th>
                    <th>Evaluation 2</th>
                    <th>Evaluation 3</th>
                </tr>
                {checkStudents(row.students)}
                </table>
                <button className="button" onClick={() => this.openModal()} ><span>Add Student</span></button>
                <div id="myModal" className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={this.closeModal}>&times;</span>
                    <p>Enter student email</p>
                    <div className='LoginInput'>
                    <i className="material-icons">email</i>
                        <input
                            type='text'
                            name='emailForNewStudent'
                            onChange={this.myChangeHandler}
                            placeholder='  Email'
                        />
                    </div>
                    <button className="button" onClick={() => this.addNewStudent(row.idclass)}><span>Confirm</span></button>
                  </div>
                </div>
              </div>
            ))
            }
          </>
      );
    }
  }