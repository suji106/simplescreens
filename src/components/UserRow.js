import React from 'react';
import UserService from "../services/UserService";

class UserRow extends React.Component {
    constructor(props) {
        console.log("cons");
        super(props);
        this.state = {
            user: {
                name: '',
                email: ''
            },
        }
        this.userService = UserService.instance;
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
    }

    deleteUser() {
        if(!window.confirm("are you sure, you want to delete?"))
        {return;}
        this.userService.deleteUser(this.props.user.id).then(() => {this.props.updateUsers()})
    }

    editUser() {
        this.props.editUser(this.props.user);
    }

    render() {
        return (
            <tr className="table-row">
                <td>
                    {this.props.user.email}
                </td>
                <td />

                <td className="wbdv-username">
                    {this.props.user.name}
                </td>
                <i id="wbdv-remove"
                   onClick={this.deleteUser}
                   className="fa-2x fa fa-times wbdv-remove"
                >
                </i>
                <i id="wbdv-edit"
                   onClick={this.editUser}
                   className="fa-2x fa fa-pencil wbdv-edit"
                >
                </i>
            </tr>
        )
    }
}

export default UserRow;