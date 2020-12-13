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
        nameForNewClass: '',
        idClassCurrent: 0,
      };
      this.getClassInformation();
    }
    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    }
  
    async addNewStudent () {
      await axios.post(process.env.REACT_APP_URL+'/link-student-to-a-class', {
        idclass: this.state.idClassCurrent,
        email: this.state.emailForNewStudent
      });
      window.location.replace("/teacher");
    }
    async addNewClass () {
      await axios.post(process.env.REACT_APP_URL+'/create-class', {
        idteacher: this.state.decodedUser.iduser,
        name: this.state.nameForNewClass
      });
      window.location.replace("/teacher");
    }
    async deleteClass () {
      await axios.post(process.env.REACT_APP_URL+'/delete-class', {
        idclass: this.state.idClassCurrent,
      });
      window.location.replace("/teacher");
    }
    openModal (modalString) {
      var modal = document.getElementById(modalString);
      modal.style.display = "block";
      
    }
    closeModal (modalString) {
      var modal = document.getElementById(modalString);
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
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
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
            
            <button className="button" onClick={() => this.openModal('modalNewClass')}><span>Add Class</span></button>
            
            <div id="modalNewClass" className="modal">
'             <div className="modal-content">
                <span className="close" onClick={() => this.closeModal('modalNewClass')}>&times;</span>
                <p>Enter class name</p>
                <div className='LoginInput'>
                <i className="material-icons">book</i>
                    <input
                        type='text'
                        name='nameForNewClass'
                        onChange={this.myChangeHandler}
                        placeholder='  Name'
                    />
                </div>
                <button className="button" onClick={() => this.addNewClass()}><span>Create</span></button>
              </div>
            </div>

            {
              this.state.informationClass.map(row => (
              <div id={row.idclass}>
                <h1 className="title">{row.name}</h1>
                
                <button id="delete" className="button" onClick={() => { this.openModal('modalDeleteClass'); this.setState({idClassCurrent: row.idclass});}}>
                  <span>Delete class</span>
                </button>
                  
                <div id="modalDeleteClass" className="modal">
                  <div className="modal-content">
                    <span className="close"  onClick={() => this.closeModal('modalDeleteClass')}>&times;</span>
                    <p>Are you sure you want to delete this class? you will lose all data related to notes</p>
                    <button className="button" onClick={() => this.deleteClass()}><span>Yes</span></button>
                    <button className="button" onClick={() => this.closeModal('modalDeleteClass')}><span>Cancel</span></button>
                  </div>
                </div>

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
                
              <button className="button" onClick={() => { this.openModal('modalNewStudent'); this.setState({idClassCurrent: row.idclass});}}>
                <span>Add Student</span>
              </button>
                
              <div id="modalNewStudent" className="modal">
                <div className="modal-content">
                  <span className="close"  onClick={() => this.closeModal('modalNewStudent')}>&times;</span>
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
                  <button className="button" onClick={() => this.addNewStudent()}><span>Confirm</span></button>
                </div>
              </div>

              </div>
            ))
            }

          </>
      );
    }
  }