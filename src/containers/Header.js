import React from 'react';
import {Link} from 'react-router-dom';
import UserService from '../services/UserService';

export default class Header
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false};
        this.UserService = UserService.instance;
        this.changeLoginTrue = this.changeLoginTrue.bind(this);
        this.changeLoginFalse = this.changeLoginFalse.bind(this);
    }

    componentDidMount() {

        this.UserService.getLoginType().then(res => {
            if (res !== "None") {
                this.setState({loggedIn: true})
            }
        });
    }

    changeLoginTrue() {
        this.setState({loggedIn: true});
    }


    changeLoginFalse() {

        this.setState({loggedIn: false});
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark navbar-fixed-top">
                <a className="navbar-brand" href="#">NU Code</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to='/'>Home</Link>
                        </li>
                        {this.state.loggedIn && <li className="nav-item">
                            <Link className="nav-link" to='/movies'>My Movies</Link>
                        </li>}
                        {!this.state.loggedIn && <li className="nav-item">
                            <Link className="nav-link" to={{
                                pathname: `/login`,
                                state: {
                                    changeLoginTrue: this.changeLoginTrue
                                }
                            }}>Sign In</Link>
                        </li>}
                        {!this.state.loggedIn && <li className="nav-item">
                            <Link className="nav-link" to='/register'>Sign Up</Link>
                        </li>}

                        {this.state.loggedIn && <li className="nav-item">
                            <a className="nav-link" onClick={this.changeLoginFalse}>Logout</a>
                        </li>}

                    </ul>
                </div>
            </nav>

        );
    }


}