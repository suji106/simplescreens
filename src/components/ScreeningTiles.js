import React from 'react';
import { Link } from 'react-router-dom';
import ScreeningService from "../services/ScreeningService";
import UserService from "../services/UserService";


export default class ScreeningTiles
    extends React.Component {
    constructor(props) {
        super(props);
        this.state={screenings:[],admin:false};
        this.updateLogin = this.updateLogin.bind(this);
        this.ScreeningService = ScreeningService.instance;
        this.delete = this.delete.bind(this);
        this.UserService = UserService.instance;
        this.updateScreenings = this.updateScreenings.bind(this);
    }


    updateLogin(){

        this.UserService.getLoginType().then(res => {
            if (res.loginType === "Admin") {
                this.setState({admin: true})
            }})

    }
    delete(screeningId){
        if(!window.confirm("are you sure, you want to delete?"))
        {return;}
        this.ScreeningService.deleteScreening(screeningId)
            .then(()=>{this.updateScreenings()});
    }

    updateScreenings(){

        this.ScreeningService.getScreenings(this.props.movieId).then(screenings => this.setState({screenings:screenings}));
    }

    componentDidMount(){

        this.updateScreenings();
        this.updateLogin();
    }
    render() {
        return (
            <div className="row app-container1">
                {this.state.screenings.map(screening => (

                    <div className="col-sm-3 ">
                    <div className="card  bg-light" >

                        <div className="card-body">
                            <h2 className="card-title">{screening.title}</h2>
                            <p className="card-text">{screening.details}</p>
                            <p className="card-text">{screening.venue}</p>
                            <p className="card-text">{new Date(screening.screeningTime).toLocaleString()}</p>
                            <Link to={'/profile/${this.request.user.id}'}></Link>
                            {this.state.admin && <button className="btn btn-danger" onClick={() => {this.delete(screening.id)}}>Delete</button>}
                        </div>
                    </div>
                    </div>

                ))}
            </div>

        );
    }





}
