import React from 'react';
import UserService from "../services/UserService";
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';


class MyConnections extends React.Component {
    constructor() {
        super();
        this.UserService=UserService.instance;

        this.logout = this.logout.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.updateFollows = this.updateFollows.bind(this);
        this.updateFollowers = this.updateFollowers.bind(this);
        this.state ={
            follows:[],
            followers:[],
            loggedOut:false,


        };
    }


updateFollows(){
    fetch("https://moviewalk.herokuapp.com/api/user/follows",{
        credentials: 'include'}).then(res=> res.json())
        .then(response => {this.setState({follows:response})});


}

    updateFollowers(){
        fetch("https://moviewalk.herokuapp.com/api/user/followers",{
            credentials: 'include'}).then(res=> res.json())
            .then(response => {this.setState({followers:response})});


    }

    unfollow(userId){


        fetch("https://moviewalk.herokuapp.com/api/user/unfollow/"+userId,{
            credentials: 'include'})

            .then(response => {this.updateFollows()});


    }

    componentDidMount() {

this.updateFollowers();
this.updateFollows()

    }



    logout(){
        this.UserService.logout().then(res => {
            this.setState({loggedOut:true});}
        );

    }


    render() {
        if (this.state.loggedOut === true) {
            return <Redirect to='/' />
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
                                <a className="nav-link" onClick={this.logout}>Logout</a>
                            </li>

                        </ul>
                    </div>
                </nav>
<div className="container-fluid profile-container">
    <div className="profile-container">
    <h4> Following</h4>
    <div className="row">
        {this.state.follows.map(user => (
            <div className="col-sm-3 ">
                <div className="card  bg-light" >


                    <div className="card-body">
                        <Link className="card-title" to={'/profile/'+user.id}>{user.name}</Link>

                        <p> User Since: {new Date(user.created).toLocaleDateString()}</p>

                        <button className="btn btn-danger tile-button" onClick={() => {this.unfollow(user.id)}}>un follow</button>
                    </div>
                </div>
            </div>

        ))}
    </div>
    </div>
    <div className="profile-container">
    <h4> Followed By</h4>
    <div className="row">
        {this.state.followers.map(user => (
            <div className="col-sm-3 ">
                <div className="card  bg-light" >


                    <div className="card-body">
                        <div>
                        <Link className="card-title" to={'/profile/'+user.id}>{user.name}</Link>
                        </div>
                        <p>User Since: {new Date(user.created).toLocaleDateString()}</p>



                    </div>
                </div>
            </div>

        ))}
    </div>
    </div>
</div>

            </div>

        )
    }
}
export default MyConnections;
