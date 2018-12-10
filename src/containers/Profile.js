import React from 'react';
import UserService from "../services/UserService";
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import MovieTile from '../components/MovieTile'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                name: '',
                email: '',
                created: '',
                imageUrl: 'https://i.ndtvimg.com/i/2018-03/sachin-tendulkar-facebook_806x605_41522254726.jpg',
                rottenUrl: 'rotten tomatoes url please!',
                imdbUrl: 'imdb url please',
                loggedIn: false,
            },
            userId: Number(this.props.match.params.id),
            logout: false,
            ownMovies: [],
            assocMovies: [],
            showFollow: false
        };
        this.updateProfile = this.updateProfile.bind(this);
        this.emailChanged = this.emailChanged.bind(this);
        this.rottenChanged = this.rottenChanged.bind(this);
        this.imdbChanged = this.imdbChanged.bind(this);
        this.usernameChanged = this.usernameChanged.bind(this);
        this.renderEmail = this.renderEmail.bind(this);
        this.loggedInProfile = this.loggedInProfile.bind(this);
        this.anonymousProfile = this.anonymousProfile.bind(this);
        this.logout = this.logout.bind(this);
        this.userService = UserService.instance;
        this.followUser = this.followUser.bind(this);
        this.displayFollow = this.displayFollow.bind(this);
    }

    logout() {
        this.userService.logout().then(res => {
                this.setState({logout: true});
            }
        );
    }

    displayFollow() {
        return (this.state.showFollow && !this.state.profile.loggedIn);
    }

    followUser() {
        fetch("https://moviewalk.herokuapp.com/api/user/follow/" + this.state.userId, {
            credentials: 'include'
        }).then(() => {
            this.setState({showFollow: false})
        });
    }

    componentDidMount() {
        console.log("profileMounted");
        const profileUrl = "https://moviewalk.herokuapp.com/api/user/" + this.state.userId;
        const participantUrl = "https://moviewalk.herokuapp.com/api/user"
        fetch(participantUrl, {credentials: 'include'})
            .then(response => response.json())
            .then(participant => {
                fetch(profileUrl, {credentials: "include"}).then(response => (response.json()))
                    .then(profile => {
                        if (participant.id === this.state.userId) {
                            profile.loggedIn = true;
                            this.setState({
                                profile: profile
                            })
                        }
                        else {
                            profile.loggedIn = false;
                            this.setState({
                                profile: profile
                            })
                        }
                    });
            });
        fetch("https://moviewalk.herokuapp.com/api/applications/accepted/" + this.state.userId, {
            credentials: 'include'
        })
            .then(response => (response.json()))
            .then(movies => this.setState({
                assocMovies: movies
            }));
        fetch("https://moviewalk.herokuapp.com/api/movies/host/" + this.state.userId, {
            credentials: 'include'
        })
            .then(response => (response.json()))
            .then(movies => this.setState({
                ownMovies: movies
            }));
        fetch("https://moviewalk.herokuapp.com/api/user/follows/" + this.state.userId, {
            credentials: 'include'
        }).then(response => (response.json()))
            .then(res => {
                if (res.follows === "false") {
                    this.setState({showFollow: true});
                }
            });
    }

    usernameChanged(event) {
        var state = this.state;
        state.userId = this.state.userId;
        var profile = this.state.profile;
        profile.name = event.target.value;
        state.profile = profile;
        this.setState(state);
    }

    emailChanged(event) {
        var state = this.state;
        state.userId = this.state.userId;
        var profile = this.state.profile;
        profile.email = event.target.value;
        state.profile = profile;
        this.setState(state);
    }

    rottenChanged(event) {
        var state = this.state;
        state.userId = this.state.userId;
        var profile = this.state.profile;
        profile.rottenUrl = event.target.value;
        state.profile = profile;
        this.setState(state);
    }

    imdbChanged(event) {
        var state = this.state;
        state.userId = this.state.userId;
        var profile = this.state.profile;
        profile.imdbUrl = event.target.value;
        state.profile = profile;
        this.setState(state);
    }

    updateProfile() {
        this.userService.updateProfile(this.state.profile).then(() => {
            alert("profile updated successfully")
        })
    }

    renderEmail() {
        return (
            <div className="input-group-prepend">
                <span className="input-group-text" id="">Email</span>
                <input onChange={this.emailChanged} type="text" disabled={true}
                       className="form-control" placeholder={this.state.profile.email}/>
            </div>
        )
    }

    loggedInProfile() {
        return (
            <div className="row">
                <div className="col-2"/>
                <div className="col-8">
                    <div className="input-group1">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">Name</span>
                            <input onChange={this.usernameChanged} type="text"
                                   className="form-control" placeholder={this.state.profile.name}
                            />
                        </div>
                    </div>
                    <div className="input-group1">
                        {this.state.profile.loggedIn && this.renderEmail()}
                    </div>
                    <div className="input-group1">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">RottenTomatoes URL</span>
                            <input onChange={this.rottenChanged} type="text"
                                   className="form-control" placeholder={this.state.profile.rottenUrl}/>
                        </div>
                    </div>
                    <div className="input-group1">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">imdb URL</span>
                            <input onChange={this.imdbChanged} type="text"
                                   className="form-control" placeholder={this.state.profile.imdbUrl}/>
                        </div>
                    </div>
                    <div className="input-group1">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">User Since</span>
                            <input type="text" disabled={true}
                                   className="form-control"
                                   placeholder={new Date(this.state.profile.created).toLocaleDateString()}/>
                        </div>
                    </div>
                    <button className="btn btn-primary btn-block" onClick={this.updateProfile}>Update</button>
                </div>
                <div className="col-2"/>
            </div>
        )
    }

    anonymousProfile() {
        return (
            <div className="row">
                <div className="col-2"/>
                <div className="col-8">
                    <div className="input-group1">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">Name</span>
                            <input onChange={this.usernameChanged} type="text"
                                   className="form-control" placeholder={this.state.profile.name}
                                   disabled/>
                        </div>
                    </div>
                    <div className="input-group1">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">RottenTomatoes URL</span>
                            <input onChange={this.rottenChanged} type="text"
                                   disabled className="form-control" placeholder={this.state.profile.rottenUrl}/>
                        </div>
                    </div>
                    <div className="input-group1">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">IMDB URL</span>
                            <input onChange={this.imdbChanged} type="text"
                                   disabled className="form-control" placeholder={this.state.profile.imdbUrl}/>
                        </div>
                    </div>
                    <div className="input-group1">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">User Since</span>
                            <input type="text" disabled={true}
                                   disabled className="form-control"
                                   placeholder={new Date(this.state.profile.created).toLocaleDateString()}/>
                        </div>
                    </div>
                </div>
                <div className="col-2"/>
            </div>
        )
    }

    render() {
        if (this.state.logout === true) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
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
                                <Link className="nav-link" to='/movies'>My Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/connections'>My Network</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.logout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container-fluid profile-container">
                    {this.displayFollow() &&
                    <button className="btn btn-primary float-right" onClick={this.followUser}>Follow</button>}
                    {this.state.profile.loggedIn && this.loggedInProfile()}
                    {!this.state.profile.loggedIn && this.anonymousProfile()}
                    {
                        !this.state.profile.loggedIn &&
                        <div>
                            <h4>Owned Movies</h4>
                            <div className="row profile-container">
                                {this.state.ownMovies.map(movie => (<MovieTile movie={movie}/>))}
                            </div>
                            <h4>Associated Movies</h4>
                            <div className="row profile-container">
                                {this.state.assocMovies.map(movie => (<MovieTile movie={movie}/>))}
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Profile;