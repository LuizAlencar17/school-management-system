import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../components/css/Login.css';

export default class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        name: '',
        password: '',
        password_again: '',
        age: '',
        genre: '',
      };
    }
    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    }
    checkInformation = () => {
      if(
        this.state.password === this.state.password_again
        ){
        this.register();
      }
    }
    register = () => {
      console.log(this.state);
      axios.post(process.env.REACT_APP_URL+'/register-user', {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        age: this.state.age,
        genre: this.state.genre,
        status: "T"
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    render() {
      return (
        <div className="card">
            <div className='LoginForm'>
            <h1>Register</h1>
                <div className='LoginInput'>
                <i className="material-icons">person_outline</i>
                    <input
                        type='name'
                        name='name'
                        onChange={this.myChangeHandler}
                        placeholder='  Name'
                    /><div id="line"></div>​
                </div>
                <div className='LoginInput'>
                <i className="material-icons">email</i>
                    <input
                        type='email'
                        name='email'
                        onChange={this.myChangeHandler}
                        placeholder='  Email'
                    /><div id="line"></div>​
                </div>
                <div className='LoginInput'>
                <i className="material-icons">vpn_key</i>
                    <input
                        type='password'
                        name='password'
                        onChange={this.myChangeHandler}
                        placeholder='  Password'
                    /><div id="line"></div>​
                </div>
                <div className='LoginInput'>
                <i className="material-icons">vpn_key</i>
                    <input
                        type='password'
                        name='password'
                        onChange={this.myChangeHandler}
                        placeholder=' Password again'
                    /><div id="line"></div>​
                </div>
                <div className='LoginInput'>
                <i className="material-icons">date_range</i>
                    <input
                        type='date'
                        name='age'
                        onChange={this.myChangeHandler}
                        placeholder=' Age'
                    /><div id="line"></div>​
                </div>
                <div className='LoginInput'>
                <i className="material-icons">people_outline</i>
                    <input
                        type='genre'
                        name='genre'
                        onChange={this.myChangeHandler}
                        placeholder=' Genre'
                    /><div id="line"></div>​
                </div>

                <button className="button" onClick={this.checkInformation}><span>Confirm </span></button>
                <Link className="link" to="/">{"< Back"}</Link>
                
                <div>
                  ..
                </div>
            </div>
        </div>
      );
    }
  }