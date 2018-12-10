import React from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import UserService from "../services/UserService";

export default class MovieTile
    extends React.Component {
    constructor(props) {
        super(props);
        this.onMovieClick = this.onMovieClick.bind(this);
        this.state = {redirect: false, loginType: "None"};
        this.UserService = UserService.instance;
    }

    componentDidMount() {
        this.UserService.getLoginType().then(res => {
                if (res.loginType !== "None") {
                    this.setState({loginType: res.loginType})
                }
            }
        );
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to={{pathname: '/MovieDetail', state: {movie: this.props.movie}}}/>
        }

        return (
            <div className="col-sm-3 ">
                {console.log(this.props.movie)}
                <div onClick={this.onMovieClick} className="card clickable-card  bg-light">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.movie.title}</h5>
                        <img className="poster img-responsive" src={this.props.movie.poster}/>
                        <p className="card-text">{this.props.movie.summary}</p>
                        <p className="card-text">Languages: {this.props.movie.languages}</p>
                        {this.props.movie.cast != null &&
                        <ul>
                            {this.props.movie.cast.split(", ").map(cast => (<li> {cast}</li>))}
                        </ul>
                        }
                        <p className="card-text">Genre: {this.props.movie.genre}</p>
                    </div>
                </div>
            </div>
        );
    }

    onMovieClick(event) {
        console.log("hi");
        if (this.state.loginType !== "None") {

            this.setState({redirect: true})
        }
        else {

            alert("please log in to contiue");
        }
    }

}
