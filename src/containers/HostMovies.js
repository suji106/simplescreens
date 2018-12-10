import React from 'react';
import MovieService from "../services/MovieService";
import MovieTile from '../components/MovieTile'

class HostMovies extends React.Component {
    constructor() {
        super();
        this.linkChanged = this.linkChanged.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.summaryChanged = this.summaryChanged.bind(this);
        this.createMovie = this.createMovie.bind(this);
        this.tokenChanged = this.tokenChanged.bind(this);
        this.getMovies = this.getMovies.bind(this);
        this.MovieService = MovieService.instance;
        this.state = {
            link: "",
            movies: [],
            languages: "English, Japanese, French",
            summary: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
            title: "Inception",
            url: "http://www.omdbapi.com/?apikey=c1cb9ddb&i=tt1375666",
            cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy",
            genre: "Action, Adventure, Sci-Fi, Thriller",
            poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
        }
    }

    componentDidMount() {
        this.getMovies();
    }

    getMovies() {
        this.MovieService.getOwnedMovies().then((movies) => {
            console.log(movies);
            this.setState({movies: movies})
        });
    }

    createMovie() {
        let url = '';
        if (this.state.link.includes('tt')) {
            url = 'http://www.omdbapi.com/?apikey=c1cb9ddb&i=' + this.state.link;
        }
        else {
            url = 'http://www.omdbapi.com/?apikey=c1cb9ddb&s=' + this.state.link;
        }

        fetch(url).then(response => {
            let d = response.json();
            // console.log(d);
            return d;
        }).then(movie => {
            // console.log(movie);
            let key, keys = Object.keys(movie);
            let n = keys.length;
            let newObj = {};
            while (n --) {
                key = keys[n];
                newObj[key.toLowerCase()] = movie[key];
            }
            newObj['cast'] = newObj['actors'];
            newObj['summary'] = newObj['plot'];
            newObj['languages'] = newObj['language'];
            this.MovieService.addMovie(newObj).then(() => {
                // console.log(newObj);
                alert("movie added successfully");
                window.location.reload(); 
            })
        });
    }

    tokenChanged(event) {
        this.setState({
            token:
            event.target.value
        });
    }

    linkChanged(event) {
        this.setState({
            link:
            event.target.value
        });
    }

    titleChanged(event) {
        this.setState({
            title:
            event.target.value
        });
    }

    summaryChanged(event) {
        this.setState({
            summary:
            event.target.value
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <h4 className="add-movie"> Add a new Movie </h4>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">Enter Movie to Be Screened Movie</span>
                    </div>
                    <input onChange={this.linkChanged} type="text" className="form-control"
                           placeholder="enter movie name or id"
                    />
                </div>
                <button type="button" className="btn btn-success btn-block" onClick={this.createMovie}>Save</button>

                <div className="movies-list">
                    <h4> Owned Movies</h4>
                    <div className="row ">
                        {this.state.movies.map(movie => (<MovieTile movie={movie}/>))}
                    </div>
                </div>
            </div>
        )
    }
}

export default HostMovies;
