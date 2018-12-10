import React from 'react';
import UserService from "../services/UserService";
import UserRow from "../components/UserRow";
import {Link} from 'react-router-dom';

class UserAdmin extends React.Component {
    constructor(props) {
        console.log("cons");
        super(props);
        this.state = {
            users: [],

                email: '',
                name: '',
                password:'',
                editId:''

        }
        this.userService = UserService.instance;
        this.createUser = this.createUser.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.updateUsers = this.updateUsers.bind(this);
        this.editUser= this.editUser.bind(this);
        this.updateUser  = this.updateUser.bind(this);
    }

    componentDidMount() {

this.updateUsers();
    }

    updateUsers(){

        fetch("https://moviewalk.herokuapp.com/api/users")
            .then(response => (response.json())
            )
            .then(users => this.setState({
                users: users
            }));

    }

    editUser(user){

        if(user.name==null){
            user.name='';
        }
        console.log(user);
        this.setState({email:user.email,name:user.name,password:user.password,editId:user.id});

    }

    updateUser(){

        let user = { email:this.state.email,
            name:this.state.name,
            password:this.state.password,
            id:this.state.editId}
        this.userService.updateAdminProfile(user).then(() => {this.updateUsers()});
    }


    createUser() {

        let user = { email:this.state.email,
        name:this.state.name,
        password:this.state.password}

        this.userService.createUser(user).then(() => {this.updateUsers()});
    }

    render() {
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


                        </ul>
                    </div>
                </nav>

                <div className="app-container container-fluid">
                <h1 id="adminTitle">Admin Page</h1>
                <table className="table">
                    <thead>

                    <tr id ="wbdv-table-heading">
                        <th>e-mail</th>
                        <th>Password</th>
                        <th>name</th>
                        <th/>
                    </tr>
                    <tr className="table-row">
                        <td>
                            <input onChange={event => {
                                this.setState({

                                        email: event.target.value,


                                })
                            }}  value={this.state.email}/>
                        </td>
                        <td>
                            <input type="password"  onChange={event => {
                                this.setState({
                                        password: event.target.value
                                })
                            }} value={this.state.password}/>
                        </td>

                        <td>
                            <input onChange={event => {
                                this.setState({

                                    name: event.target.value


                                })
                            }} value={this.state.name}/>
                        </td>

                        <td>
                            <i id="createUser"
                               onClick={this.createUser}
                               className="fa-2x fa fa-plus wbdv-create">
                            </i>
                            <i id="updateUser"
                               onClick={this.updateUser}
                               className="fa-2x fa fa-check wbdv-update">
                            </i>
                        </td>
                    </tr>
                    </thead>
                    {this.state.users.map(user => (
                            <UserRow user={user} updateUsers={this.updateUsers} editUser={this.editUser}/>
                        )
                    )}
                </table>

                </div>
            </div>
        )
    }
}

export default UserAdmin;