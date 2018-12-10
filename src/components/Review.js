import React from 'react';
import UserService from "../services/UserService";
import ReviewService from "../services/ReviewService";

class Review extends React.Component {

    constructor(props) {
        super(props);
        this.state = {admin: false};
        this.updateLogin = this.updateLogin.bind(this);
        this.delete = this.delete.bind(this);
        this.UserService = UserService.instance;
        this.ReviewService = ReviewService.instance;
    }

    componentDidMount() {
        this.updateLogin();
    }

    updateLogin() {

        this.UserService.getLoginType().then(res => {
            if (res.loginType === "Admin") {
                this.setState({admin: true})
            }
        })

    }

    delete(reviewId) {
        if (!window.confirm("are you sure, you want to delete?")) {
            return;
        }
        this.ReviewService.deleteReview(reviewId)
            .then(() => {
                this.props.updateReviews()
            });
    }

    render() {
        return (
            <div className="reviewBox">
                {this.state.admin && <button className="btn btn-danger float-right" onClick={() => {
                    this.delete(this.props.reviewObject.id)
                }}>Delete</button>}
                <div>
                    {this.props.reviewObject.review}
                </div>
                <h6>
                    {this.props.reviewObject.user.name} &nbsp;({this.props.reviewObject.loginType}) &nbsp; on {new Date(this.props.reviewObject.created).toLocaleString()}
                </h6>
            </div>
        )
    }
}

export default Review;