import React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';

import '../components/css/Login.css';

export default class Login extends React.Component {
    constructor(props) {
      console.log('Valor: '+process.env.REACT_APP_ACCESS_TOKEN);
      super(props);
      this.state = {
        email: '',
        password: '',
      };
    }
    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    }
    login = () => {
      axios.post(process.env.REACT_APP_URL+'/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(function (response) {
        localStorage.setItem('token', response.data.token);
        var decoded = jwt.verify(localStorage.getItem('token'), process.env.REACT_APP_ACCESS_TOKEN);
        var decodedUser = decoded.user;
        if(decodedUser.profile === 'Student' ){
          window.location.replace("/student");
        }else{
          window.location.replace("/teacher");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    render() {
      return (
        <div className="card">
            <div className='LoginForm'>
            <h1>Login</h1>
                <div className='LoginInput'>
                <i className="material-icons">email</i>
                    <input
                        type='text'
                        name='email'
                        onChange={this.myChangeHandler}
                        placeholder='  Email'
                    />
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

                <button className="button" onClick={this.login}><span>Log in </span></button>
                <button className="button" ><span><Link className="link" to="/register">Register</Link></span></button>
                <div>
                  ..
                </div>
            </div>
        </div>
      );
    }
  }