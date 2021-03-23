import React from 'react';
import { connect } from 'react-redux'
import store from '../store/store';
import { NavLink } from 'react-router-dom';
// import validator from 'validator';

// import { checkLogin, assureRegPasswords, checkRemember } from '../Services/Services'
import { CreateActionSetLogin, CreateActionPassword } from '../actions/actions'

class Authorization extends React.Component {
   check = false;
   ls = window.localStorage;
   URL = "http://localhost:3001";
   state = {
      message: ""
  }

   setLogin(event) {
      this.props.dispatch(CreateActionSetLogin(event.target.value));
      this.setState({ message: "" });

   }
   setPassword(event) {
      this.props.dispatch(CreateActionPassword(event.target.value));
      this.setState({ message: "" });

   }

   Mycheck(event) {
      this.check = event.target.checked;
   }

   auth(event) {
      event.preventDefault();

      const email = store.getState().login;
      const password = store.getState().password;

      console.log(email, password)
      fetch(`${this.URL}/login`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email, password }),
      })
         .then(response => {
            return response.json();
         })
         .then(data => {
            console.log(data);
            if (data.success)
               this.props.history.push('/showpage');
            else this.setState({ message: data.message });
         })
         .catch(err => {
            alert(err);
            console.log("Not Found");
         });
   }

   render() {


      return (
         <form style={{ width: "500px", margin: "auto" }}>
            <h2>Sign in</h2>
            <div className="form-group">
               <label htmlFor="email">Email address</label>
               <input className="form-control" onChange={(event) => this.setLogin(event)} type="email" id="email" placeholder="name@example.com" />
            </div>
            <div className="form-group">
               <label htmlFor="password">Password</label>
               <input className="form-control" onChange={(event) => this.setPassword(event)} type="password" name="password" placeholder="••••••••" />
            </div>
            {!this.state.message ? null : <span style={{ color: "#D81313", fontSize: "12px" }}>{this.state.message}</span>}
            <div className="d-flex justify-content-end">
               <div>
                  <label>
                     <input type="checkbox" name="remember" value="remember" onChange={(event) => this.Mycheck(event)} />
                     <span> Remember me</span>
                  </label>
               </div>
            </div>
            <div className="d-flex justify-content-around">
               <div className="p-2">
                  <NavLink to="/showpage" className="btn btn-primary" activeClassName="active" onClick={(event) => this.auth(event)}>Sign in</NavLink>
               </div>
               <div className="p-2">
                  <NavLink to="/registration" className="btn btn-primary" activeClassName="active">Sign up</NavLink>
               </div>
            </div>
         </form>

      );
   }
}

const mapStateToProps = function (state) {
   return {
      login: state.login,
      password: state.password
   }
}

export default connect(mapStateToProps)(Authorization);