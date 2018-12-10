import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import MovieTiles from './containers/MovieTiles'
import Register from './containers/Register'
import MovieDetail from './containers/MovieDetail'
import Login from './containers/Login'
import MyMoviesEditor from "./containers/MyMoviesEditor";
import Profile from './containers/Profile';
import UserAdmin from "./containers/UserAdmin";
import MyConnections from "./containers/MyConnections";

class App extends Component {

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route path="/"
                               exact component={MovieTiles}>
                        </Route>
                        <Route path="/movies"
                               exact component={MyMoviesEditor}>
                        </Route>

                        <Route path="/register"
                               exact component={Register}>
                        </Route>

                        <Route path="/login"
                               exact component={Login}>
                        </Route>

                        <Route path="/profile/:id"
                               exact component={Profile}>
                        </Route>

                        <Route path="/MovieDetail"
                               exact component={MovieDetail}>
                        </Route>

                        <Route path="/user-admin"
                               exact component={UserAdmin}>
                        </Route>

                        <Route path="/connections"
                               exact component={MyConnections}>
                        </Route>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
