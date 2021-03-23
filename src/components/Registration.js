import React from 'react';
import { connect } from 'react-redux'
import store from '../store/store';
import { NavLink } from 'react-router-dom';
// import validator from 'validator';

// import { createUser, assureAreEqual, assureRegPasswords } from '../Services/Services'

import { CreateActionSetLogin, CreateActionPassword } from '../actions/actions'

class Registration extends React.Component {

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


    register(event) {
        event.preventDefault();

        const email = store.getState().login;
        const password = store.getState().password;

        fetch(`${this.URL}/create`, {
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
                    this.props.history.push('/');
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
                <h2>Sign up</h2>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input className="form-control" onChange={(event) => this.setLogin(event)} id="email" type="email" name="email" placeholder="name@example.com" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" onChange={(event) => this.setPassword(event)} id="password" type="password" name="password" placeholder="••••••••" />
                </div>
                {!this.state.message ? null : <span style={{ color: "#D81313", fontSize: "12px" }}>{this.state.message}</span>}
                <div className="d-flex p-2 justify-content-start">
                    <div>
                        <NavLink to="/" className="btn btn-primary" activeClassName="active" onClick={(event) => this.register(event)}>Sign up</NavLink>
                    </div>
                </div>
            </form>

        );
    }
}

const mapStateToProps = function (state) {
    return {
        login: state.login,
        password: state.password,
    }
}

export default connect(mapStateToProps)(Registration);