import React from 'react';
import LoginService from '../services/LoginService';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class Login extends React.Component {
    constructor() {
        super();
        this.emailChanged = this.emailChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.login = this.login.bind(this);

        this.LoginService = LoginService.instance;
        this.loginTypeChanged = this.loginTypeChanged.bind(this);
        this.normalLogin = this.normalLogin.bind(this);

        this.state = {
            loginType: "Host",
            email: "",
            password: "",
            applications: []
        }
    }

    login(res, type) {
        let postData;
        if (type === 'facebook' && res.email) {
            postData = {
                name: res.name,
                provider: type,
                email: res.email,
                user_pic: res.picture.data.url,
                loginType: this.state.loginType
            };
        }

        if (type === 'google' && res.w3.U3) {
            postData = {
                name: res.w3.ig,
                provider: type,
                email: res.w3.U3,
                user_pic: res.w3.Paa,
                loginType: this.state.loginType
            };
        }

        if (postData) {
            this.LoginService.login(postData).then((result) => {
                sessionStorage.setItem("userData", JSON.stringify(result));
                this.setState({redirect: true});
            });
        } else {
        }
    }

    normalLogin() {
        this.LoginService.normalLogin({
            email: this.state.email,
            password: this.state.password,
            loginType: this.state.loginType
        }).then(
            (res) => {
                if (res !== null) {
                    this.setState({redirect: true})
                }
                else {

                    alert("Incorrect Username / Password");
                }
            })
    }

    emailChanged(event) {
        this.setState({
            email:
            event.target.value

        });
    }

    passwordChanged(event) {
        this.setState({
            password:
            event.target.value

        });
    }

    loginTypeChanged(event) {
        this.setState({
            loginType:
            event.target.value

        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand" href="/">Simple Screens</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/register'>Register</Link>
                            </li>

                        </ul>
                    </div>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 loginBox">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="">Login as</span>
                                </div>
                                <select onChange={this.loginTypeChanged} value={this.state.loginType}
                                        className="form-control">
                                    <option selected="selected" value="Host">Host</option>
                                    <option value="Participant">Participant</option>
                                    <option value="Critic">Critic</option>
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="">email</span>
                                </div>
                                <input onChange={this.emailChanged} type="text" className="form-control"
                                       placeholder="enter email"/>
                            </div>
                            <div className="input-group ">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Password</span>
                                </div>
                                <input onChange={this.passwordChanged} type="password" className="form-control"
                                       placeholder="enter password"/>
                            </div>
                            <button type="button" className="btn btn-block btn-success"
                                    onClick={this.normalLogin}>Login
                            </button>
                        </div>
                        <div className="col-3"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
