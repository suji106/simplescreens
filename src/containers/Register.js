import React from 'react';
import LoginService from "../services/LoginService";
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom';


class Register extends React.Component {
    constructor() {
        super();
        //this.MovieService = MovieService.instance;
        this.emailChanged = this.emailChanged.bind(this);
        this.password1Changed = this.password1Changed.bind(this);
        this.password2Changed = this.password2Changed.bind(this);
        this.register = this.register.bind(this);
        this.LoginService =LoginService.instance;
        this.state ={
            email:"",
            password1:"",
            password2:"",
            toLogin:false
        }


    }




    register(){
        if(this.state.password1 !== this.state.password2)
        {
            alert("passwords do not match");
        }
        else {
            this.LoginService
                .findEmail(this.state.email)
                .then((email) => {
                    if (email !== null) {
                        alert("email is already taken");
                    }
                    else {
                        this.LoginService
                            .registerUser({email:this.state.email, password:this.state.password1} )
                            .then(() =>
                                this.setState({toLogin:true}));
                    }
                });
        }



    }



    emailChanged(event) {
        this.setState({
            email:
            event.target.value

        });
    }


    password1Changed(event) {
        this.setState({
            password1:
            event.target.value

        });
    }

    password2Changed(event) {
        this.setState({
            password2:
            event.target.value

        });
    }

    render() {
        if (this.state.toLogin === true) {
            return <Redirect to='/login' />
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark navbar-fixed-top">
                    <a className="navbar-brand" href="/">Simple Screens</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/login'>Login</Link>
                            </li>

                        </ul>
                    </div>
                </nav>

<div className="container-fluid">
    <div className="row registration">
        <div className="col-3"/>
    <div className="col-6">
                <div className="input-group mb-3">

                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">E-mail</span>
                    </div>
                    <input onChange={this.emailChanged} type="text" className="form-control" placeholder="enter email"
                    />

                </div >


                <div className="input-group ">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Password</span>
                    </div>
                    <input  onChange={this.password1Changed} type="password" className="form-control" placeholder="enter password"
                    />
                </div>

                <div className="input-group ">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Confirm Password</span>
                    </div>
                    <input  onChange={this.password2Changed} type="password" className="form-control" placeholder="Re-enter password"
                    />
                </div>


                <button type="button" className="btn btn-success btn-block"  onClick={this.register}>Register</button>
       </div >
        <div className="col-3"/>
    </div>
</div>

            </div>



        )
    }
}
export default Register;
