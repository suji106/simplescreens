import React from 'react';
import { Link } from 'react-router-dom';
import RequestService from "../services/RequestService";
import UserService from "../services/UserService";


export default class PendingRequests
    extends React.Component {
    constructor(props) {
        super(props);
        this.accept = this.accept.bind(this);
        this.reject=this.reject.bind(this);
        this.state={contriRequests:[], criticRequests:[], admin:false};
        this.requestService = RequestService.instance;
        this.updateRequests = this.updateRequests.bind(this);
        this.updateLogin = this.updateLogin.bind(this);
        this.UserService = UserService.instance;
    }

    accept(id){
        this.requestService.acceptRequest(id).then(() => {window.location.reload()})
    }

    reject(id){
        this.requestService.rejectRequest(id).then(() => {this.updateRequests();})
    }
    componentDidMount(){
this.updateRequests();
this.updateLogin();

    }

    updateLogin(){

        this.UserService.getLoginType().then(res => {
            if (res.loginType === "Admin") {
                this.setState({admin: true})
            }})

    }

    delete(requestId){
        if(!window.confirm("are you sure, you want to delete?"))
        {return;}
        this.requestService.deleteRequest(requestId)
            .then(()=>{this.updateRequests()});
    }

    updateRequests(){
        this.requestService.getContriRequests(this.props.movieId).then(applications => this.setState({contriRequests:applications}));
        this.requestService.getCriticRequests(this.props.movieId).then(applications => this.setState({criticRequests:applications}));
    }

    render() {

        return (
            <div >
            <h5>Pending Participant Requests</h5>
            <div className="row app-container1">
                {this.state.contriRequests.map(request => (
                    <div className="col-sm-3 ">
                        <div className="card  bg-light" >


                        <div className="card-body">
                            <Link className="card-title" to={'/profile/'+request.user.id}><h5 className="card-title">{request.user.name}</h5></Link>
                            <p className="card-text">{request.details}</p>

                            <button className="btn btn-success tile-button" onClick={() => {this.accept(request.id)}}>Accept</button>
                            <button className="btn btn-danger tile-button" onClick={() => {this.reject(request.id)}}>Reject</button>
                            {this.state.admin && <button className="btn btn-danger tile-button" onClick={() => {this.delete(request.id)}}>Delete</button>}
                        </div>
                    </div>
                    </div>
                    ))}
            </div>

                <h5>Pending Critiquing Requests</h5>
                <div className="row app-container1">
                    {this.state.criticRequests.map(request => (
                        <div className="col-sm-3 ">
                            <div className="card  bg-light" >



                            <div className="card-body">
                                <Link to={'/profile/'+request.user.id}><h5 className="card-title">{request.user.name}</h5></Link>
                                <p className="card-text">{request.details}</p>

                                <button className="btn btn-success tile-button" onClick={() => {this.accept(request.id)}}>Accept</button>
                                <button className="btn btn-danger tile-button" onClick={() => {this.reject(request.id)}}>Reject</button>
                                {this.state.admin && <button className="btn btn-danger tile-button" onClick={() => {this.delete(request.id)}}>Delete</button>}
                            </div>
                        </div>
                        </div>

                    ))}
                </div>



            </div>
        );
    }





}
