import React from 'react';
import { connect } from 'react-redux'
import store from '../store/store';
import { NavLink } from 'react-router-dom';

import { CreateActionSetLogin, CreateActionPassword } from '../actions/actions'

class Registration extends React.Component {

    URL = "http://localhost:3001";

    state = {
        message: "",
        current: [],
        loading: false
    }

    setLogin(event) {

        this.props.dispatch(CreateActionSetLogin(event.target.value));
        this.setState({ message: "" });

    }
    setPassword(event) {

        this.props.dispatch(CreateActionPassword(event.target.value));
        this.setState({ message: "" });

    }
    setImage(event) {
        console.log(event.target.files)

        this.setState({ current: event.target.files });

    }



    async register(event) {
        event.preventDefault();

        const email = store.getState().login;
        const password = store.getState().password;

        const reader = new FileReader();

        console.log(this.state.current)
        var uint8Array = null;

        reader.readAsArrayBuffer(this.state.current[0] ? this.state.current[0] : new Blob([]));

        reader.onloadend = () => {
            console.log(reader.result)
            uint8Array = new Uint8Array(reader.result);
            console.log(uint8Array)

            this.setState({ loading: true });

            fetch(`${this.URL}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, mas: [...uint8Array] }),
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    this.setState({ loading: false });
                    if (data.success)
                        this.props.history.push('/');
                    else this.setState({ message: data.message });
                })
                .catch(err => {
                    alert(err);
                    console.log("Not Found");
                });

        };


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
                <div className="d-flex p-2 justify-content-center">
                    <div>
                        <NavLink to="/" className="btn btn-primary" activeClassName="active" onClick={(event) => this.register(event)}>Sign up</NavLink>

                        <input
                            className='btn btn-info'
                            onChange={(event) => this.setImage(event)}
                            accept="image/*"
                            type="file"
                        />
                    </div>
                </div>
                <label>{this.state.loading ? 'Retention...' : null}</label>
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