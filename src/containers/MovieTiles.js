import React from 'react';
import MovieTile from "../components/MovieTile";
import MovieService from "../services/MovieService";
import UserService from "../services/UserService";
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';


class MovieTiles extends React.Component {
    constructor() {
        super();
        this.searchChanged = this.searchChanged.bind(this);
        this.newSearch = this.newSearch.bind(this);
        this.updateLogin = this.updateLogin.bind(this);
        this.logout = this.logout.bind(this);
        this.toProfile = this.toProfile.bind(this);
        this.MovieService = MovieService.instance;
        this.UserService = UserService.instance;

        this.state = {
            loggedIn: false,
            searchTerm: '',
            movies: [],
            userId: '',
            changeProfile: false,
            loginType: ""
        };
    }

    componentDidMount() {
        this.MovieService.findAllMovies()
            .then(movies => {
                console.log(movies);
                this.setState({movies: movies})
            });
        this.updateLogin()
    }

    toProfile() {
        this.UserService.getProfile().then(res => {
            this.setState({userId: res.id, changeProfile: true})
        });

    }

    logout() {
        this.UserService.logout().then(res => {
                this.updateLogin();
            }
        );

    }

    updateLogin() {

        this.UserService.getLoginType().then(res => {
                if (res.loginType !== "None") {
                    this.setState({loggedIn: true, loginType: res.loginType})
                }

                else {
                    this.setState({loggedIn: false, loginType: res.loginType})
                }
            }
        );
    }


    searchChanged(event) {
        this.setState({
            searchTerm: event.target.value

        });
    }

    newSearch() {
        fetch("https://moviewalk.herokuapp.com/api/specialized", {
            body: JSON.stringify(this.state.searchTerm),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        }).then(movies => this.setState({movies: movies}));

    }


    render() {
        if (this.state.changeProfile) {
            return <Redirect to={'/profile/' + this.state.userId}/>
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
                            {this.state.loggedIn && <li className="nav-item">
                                <Link className="nav-link" to='/movies'>My Movies</Link>
                            </li>}

                            {this.state.loggedIn && <li className="nav-item">
                                <Link className="nav-link" to='/connections'>My Network</Link>
                            </li>}


                            {this.state.loggedIn && <li className="nav-item">
                                <a className="nav-link" onClick={this.toProfile}>Profile</a>
                            </li>}

                            {(this.state.loginType === 'Admin') && <li className="nav-item">
                                <Link className="nav-link" to='/user-admin'>User Admin</Link>
                            </li>}

                            {!this.state.loggedIn && <li className="nav-item">
                                <Link className="nav-link" to='/login'>Sign In</Link>
                            </li>}
                            {!this.state.loggedIn && <li className="nav-item">
                                <Link className="nav-link" to='/register'>Sign Up</Link>
                            </li>}

                            {this.state.loggedIn && <li className="nav-item">
                                <a className="nav-link" onClick={this.logout}>Logout</a>
                            </li>}
                        </ul>
                    </div>
                </nav>

                <div className="container-fluid">
                    <div className="row searchBar">
                        <div className="col-3"/>
                        <div className="input-group mb-3 col-6 ">

                            <div className="input-group-prepend">
                                <span className="input-group-text" id="">Filter by Languages, Genres, or Cast</span>
                            </div>
                            <input onChange={this.searchChanged} value={this.state.searchTerm} type="text"
                                   className="form-control" placeholder="enter languages, genres, or cast"
                            />
                            <div className="input-group-append">
                                <button onClick={this.newSearch} className="btn btn-outline-secondary"
                                        type="button">Search
                                </button>
                            </div>
                        </div>
                        <div className="col-3"/>
                    </div>
                    <div>
                        <div className="row">
                            {console.log(this.state.movies)}
                            {this.state.movies.map(movie => (<MovieTile movie={movie}/>))}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default MovieTiles;
