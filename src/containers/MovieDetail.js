import React from 'react';
import GenerateRequest from '../components/GenerateRequest';
import MoviePartners from '../components/MoviePartners';
import PendingRequests from '../components/PendingRequests';
import MovieService from "../services/MovieService";
import RequestService from '../services/RequestService'
import {Link} from 'react-router-dom';
import UserService from "../services/UserService";
import GenerateScreening from "../components/GenerateScreening"
import ScreeningTiles from "../components/ScreeningTiles";
import {Redirect} from 'react-router-dom';
import ReviewsList from "./ReviewList";


class MovieDetail extends React.Component {
    constructor(props) {
        super(props);
        this.RequestService = RequestService.instance;
        this.movieService = MovieService.instance;
        this.UserService = UserService.instance;
        this.decideUser = this.decideUser.bind(this);
        this.headerJSX = this.headerJSX.bind(this);
        this.logout = this.logout.bind(this);
        this.showDelete = this.showDelete.bind(this);
        this.delete = this.delete.bind(this);

        this.state = {displayCom: false, loginType: "", displayTop: false, typeofUser: "", redirect: false}
    }


    logout() {
        this.UserService.logout().then(res => {
                this.setState({redirect: true});
            }
        );

    }

    delete(movieId) {

        if (!window.confirm("are you sure, you want to delete?")) {
            return;
        }
        this.movieService.deleteMovie(movieId)
            .then(() => {
                this.setState({redirect: true})
            });
    }

    showDelete() {

        if (this.state.typeofUser === "Admin" || this.state.loginType === "hostAcc") {
            return true;
        }
        return false;

    }

    componentDidMount() {

        this.UserService.getLoginType().then(res => {
            if (res !== "None") {
                this.setState({typeofUser: res.loginType})
            }
            this.decideUser();
        });


    }

    criticLogic(criticStatus) {


        switch (criticStatus) {

            case "accepted":

                this.setState({loginType: "criticAcc", displayTop: true, displayCom: true})

                return;


            case "rejected":

                this.setState({
                    loginType: "criticRej",
                    displayTop: true
                })
                return;


            case "pending": {
                this.setState({
                    loginType: "criticPen",
                    displayTop: true
                })
                return;

            }

            default:
                this.setState({
                    loginType: "critic",
                    displayTop: true
                });
                return;


        }
    }

    participantLogic(participantStatus) {

        switch (participantStatus) {
            case "accepted":

                this.setState({loginType: "participantAcc", displayTop: true, displayCom: true})

                return;
            case "rejected":

                this.setState({
                    loginType: "participantRej",
                    displayTop: true
                });
                return;


            case "pending":
                this.setState({
                    loginType: "participantPen",
                    displayTop: true
                });
                return;


            default:
                this.setState({
                    loginType: "participant",
                    displayTop: true
                });
                return;


        }


    }

    decideUser() {

        let movieId = this.props.location.state.movie.id;

        let user = this.state.typeofUser;
        console.log(user)
        if (user === "Host") {

            this.movieService.ownMovie(movieId).then(res => {

                if (res.isHost === "true") {
                    this.setState({
                        displayTop: true,
                        displayCom: true,
                        loginType: "hostAcc"
                    })
                }
                ;

            })

        }
        if (user === "Admin") {

            this.setState({
                loginType: "Admin", displayTop: true,
                displayCom: true,
            })
        }

        if (user === "Critic") {

            this.RequestService.getRequestStatus(movieId).then(res => {
                this.criticLogic(res.status)
            })
        }

        if (user === "Participant") {
            this.RequestService.getRequestStatus(movieId).then(res => {
                this.participantLogic(res.status)
            })

        }
    }

    headerJSX() {

        switch (this.state.loginType) {
            case "Admin":
                return (
                    <div>
                        <div className="app-container">
                            <PendingRequests movieId={this.props.location.state.movie.id}/>
                        </div>

                        <div className="app-container">
                            <h5>Would you like to host a screening?</h5>
                            <GenerateScreening movieId={this.props.location.state.movie.id}/>
                        </div>

                        <div className="app-container">
                            <h5>Upcoming Screenings</h5>
                            <ScreeningTiles movieId={this.props.location.state.movie.id}/>
                        </div>
                    </div>
                );
                break;
            case "participantRej":
                return (
                    <div>

                        <h6>We are sorry to inform that your request for movie contribution has been rejected</h6>

                    </div>
                );
                break;

            case "participantPen":
                return (
                    <div>

                        <h6>Your request for contribution is still pending</h6>

                    </div>
                );
                break;

            case "criticRej":
                return (
                    <div>

                        <h6>we are sorry to inform that your request for criticing has been rejected</h6>

                    </div>
                );
                break;

            case "criticPen":
                return (
                    <div>

                        <h6>Your request for criticing is still pending</h6>

                    </div>
                );
                break;

            case "hostAcc":
                return (
                    <div>
                        <div className="app-container">
                            <PendingRequests movieId={this.props.location.state.movie.id}/>
                        </div>
                        <div>
                            <h5>Upcoming Screenings</h5>
                            <ScreeningTiles movieId={this.props.location.state.movie.id}/>
                        </div>
                    </div>
                );
                break;

            case "participant":
                return (
                    <div>
                        <h5>Why would you like to be part of the screening?</h5>
                        <GenerateRequest movieId={this.props.location.state.movie.id}/>
                    </div>
                );
                break;

            case "critic":
                return (
                    <div className="app-container">
                        <h5>Would you like to critique this movie?</h5>
                        <GenerateRequest movieId={this.props.location.state.movie.id}/>
                    </div>
                );
                break;

            case "criticAcc":
                return (
                    <div>
                        <div className="app-container">
                            <h5>Would you like to host a screening?</h5>
                            <GenerateScreening movieId={this.props.location.state.movie.id}/>
                        </div>
                        <div className="app-container">
                            <h3>Upcoming Screenings</h3>
                            <ScreeningTiles movieId={this.props.location.state.movie.id}/>
                        </div>
                    </div>
                );
                break;

            case "participantAcc":
                return (
                    <div className="app-container">
                        <h5>Upcoming Screenings</h5>
                        <ScreeningTiles movieId={this.props.location.state.movie.id}/>
                    </div>
                );
                break;

        }

    }


    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/'/>
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

                <div className="container-fluid app-container">

                    {this.showDelete() && <button className="btn btn-danger float-right movie-delete" onClick={() => {
                        this.delete(this.props.location.state.movie.id)
                    }}>Delete Movie</button>}
                    {console.log(this.props)}
                    <h3 className="movieTitle"><a
                        href={this.props.location.state.movie.url}>{this.props.location.state.movie.title}</a></h3>
                    {this.state.displayTop && this.headerJSX()}
                    <h5>Movie Description</h5>
                    <p>{this.props.location.state.movie.summary}</p>

                    <h5>Movie Languages</h5>
                    <ul>
                        {this.props.location.state.movie.languages.split(" ").map(language => (<li> {language}</li>))}
                    </ul>
                    <div className="app-container">
                        <h5>Critics</h5>
                        <MoviePartners movieId={this.props.location.state.movie.id}
                                       getMembers={this.RequestService.getCritics}/>
                    </div>
                    <div className="app-container">
                        <h5>Participants</h5>
                        {console.log(this.props.location)}
                        <MoviePartners movieId={this.props.location.state.movie.id}
                                       getMembers={this.RequestService.getParticipants}/>
                    </div>
                    {this.state.displayCom && <ReviewsList movieId={this.props.location.state.movie.id}/>}


                </div>
            </div>

        )
    }
}

export default MovieDetail;
