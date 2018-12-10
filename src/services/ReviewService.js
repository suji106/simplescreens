let _singleton = Symbol();
const COMMENT__URL =
    'https://moviewalk.herokuapp.com/api/PID/review';

class ReviewService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    createReview(review, movieId) {

        return fetch(COMMENT__URL.replace('PID', movieId),
            {
                body: JSON.stringify({review: review}),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                credentials: 'include'
            }
        ).then(res =>  res.json());
    }

    deleteReview(reviewID){

        return fetch('https://moviewalk.herokuapp.com/api/review/'+reviewID,{
            method:'delete',
            credentials: 'include'});
    }


    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ReviewService(_singleton);
        return this[_singleton]
    }


}

export default ReviewService;