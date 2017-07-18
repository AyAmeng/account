import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
	handleClick() {
		const source = document.querySelector('.form-login-view')
		const msg = {}
		$(source).serialize().split('&').map(one => {
			msg[one.split('=')[0]] = one.split('=')[1]
			return msg
		})
		console.info(msg)
	}
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">Yeah, It's React</p>
        <form className="form-login-view">
          <h2 className="title">Hello To My World</h2>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" name="name" className="form-control" id="exampleInputEmail1" placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>
          <div  className="btn btn-default button" 
					onClick={this.handleClick.bind(this)}>LogIn</div>
        </form>
      </div>
    );
  }
}

export default App;
