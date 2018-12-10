import React from 'react';
import ReviewService from "../services/ReviewService";
import Review from "../components/Review"

class ReviewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            created: '',
            movieId:this.props.movieId,
            review: ''
        }
        this.reviewService = ReviewService.instance;
        this.updateReviews= this.updateReviews.bind(this);
        this.createReview = this.createReview.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
this.updateReviews();
    }



 updateReviews(){
     var reviewUrl = "https://moviewalk.herokuapp.com/api/PID/movie/reviews"
         .replace('PID', this.state.movieId);
     fetch(reviewUrl).then(response => (response.json()))
         .then(reviews => {
             console.log(reviews)
             this.setState({
                 reviews: reviews
             })
         });
 }

    createReview() {
        this.reviewService.createReview(this.state.review, this.state.movieId).then(()=> {this.updateReviews()});
    }

    render() {

        return (
            <div className="app-container">
                <h5>
                    Reviews
                </h5>
                <div>
                    {this.state.reviews.map(review => (
                        <Review reviewObject={review} updateReviews = {this.updateReviews}/>
                    ))}
                </div>


                    <div className="input-group ">

                        <textarea onChange={event => {
                            this.setState({
                                review: event.target.value
                            })
                        }} className="form-control" aria-label="With textarea"> </textarea>
                        <div className="input-group-append">
                        <button className="btn btn-primary"
                                onClick={this.createReview}>
                            Post Review
                        </button>
                        </div>
                    </div>





            </div>
        )
    }
}

export default ReviewsList;