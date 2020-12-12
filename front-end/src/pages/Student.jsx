import React from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import '../components/css/Student.css';

export default class Student extends React.Component {
    constructor(props) {
      var decoded = jwt.verify(localStorage.getItem('token'), process.env.REACT_APP_ACCESS_TOKEN);
      super(props);
      this.state = {
        information: [{}],
        decodedUser: decoded.user
      };
      this.getUserInformation();
    }
    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    }
    async getUserInformation () {
      var data = await axios.post(process.env.REACT_APP_URL+'/get-class-by-user', {
        id: this.state.decodedUser.iduser
      });
      this.setState({information: data.data});
      console.log(this.state.information);
    }
    render() {
      return (
          <>
            <div className="header">
                <a href="https://syncfiddle.net/fiddle/-MNAxG-dijOti95K1o3b" className="logo"><b>ODUS SYSTEM</b></a>
            </div>

            <h1 className="name">Hello, {this.state.decodedUser.name}! </h1>
            <h1 className="title">Your classes</h1>
            
            <table>
            <tr className="column">
                <th>Teacher's Name</th>
                <th>Code Class</th>
                <th>Name Class</th>
                <th>Evaluation 1</th>
                <th>Evaluation 2</th>
                <th>Evaluation 3</th>
                <th>Status</th>
                <th>Schedule</th>
            </tr>
            {
                this.state.information.map(row => (
                  <tr>
                    <th key={1}>{row.teacher}</th>
                    <th key={2}>{row.code}</th>
                    <th key={3}>{row.name}</th>
                    <th key={4}>{row.evaluation1}</th>
                    <th key={5}>{row.evaluation2}</th>
                    <th key={6}>{row.evaluation3}</th>
                    <th key={7}>{row.status}</th>
                    <th key={8}><button className="button"><span>See </span></button></th>
                  </tr>
                ))
            }
            <tr className="tr-end">
                <th>..</th>
                <th>..</th>
                <th>..</th>
                <th>..</th>
                <th>..</th>
                <th>..</th>
                <th>..</th>
                <th>..</th>
            </tr>
            </table>
          </>
      );
    }
  }