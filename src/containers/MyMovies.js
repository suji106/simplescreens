import React from 'react';
import MovieTile from "../components/MovieTile"


class MyMovies extends React.Component {
    constructor(props) {
        console.log("cons");
        super(props);
        this.state = {
            accepted: [],
            pending: [],
            rejected: [],
            movies: [],

        }

        // this.renderMovies = this.renderMovies.bind(this);
        this.updateState = this.updateState.bind(this);
    }


    componentDidMount() {


        fetch("https://moviewalk.herokuapp.com/api/applications/accepted",{
            credentials: 'include'})

            .then(response => (response.json()))
                .then(movies => this.setState({
                    accepted: movies
                }));


        fetch("https://moviewalk.herokuapp.com/api/applications/pending",{
            credentials: 'include'})

            .then(response => (response.json()))
            .then(movies => this.setState({
                pending: movies
            }));
        fetch("https://moviewalk.herokuapp.com/api/applications/rejected", {
            credentials: 'include'})

            .then(response => (response.json()))
            .then(movies => this.setState({
                rejected: movies
            }));



    }

    updateState(toThis) {
        this.setState(toThis);
    }


    render() {

        return (
            <div className="container-fluid profile-container">
                <h4 className="heading-movie">
                    Accepted Movies
                </h4>
                <div className="row">
                    {this.state.accepted.map(movie => (<MovieTile movie={movie} />))}
                </div>
                <h4 className="heading-movie">
                    Pending Movies
                </h4>
                <div className="row">
                    {this.state.pending.map(movie => (<MovieTile movie={movie} />))}
                </div>
                <h4 className="heading-movie">
                    Rejected Movies
                </h4>

                <div className="row">
                    {this.state.rejected.map(movie => (<MovieTile movie={movie} />))}
                </div>
            </div>
        )
    }
}

export default MyMovies;