import React from 'react';

import RequestService from '../services/RequestService'

class GenerateRequest extends React.Component {
    constructor() {
        super();
        this.detailsChanged = this.detailsChanged.bind(this);
        this.createRequest = this.createRequest.bind(this);
        this.RequestService = RequestService.instance;
        this.state = {
            details: ""
        }
    }

    createRequest() {
        this.RequestService.createRequest(this.props.movieId, {details: this.state.details}).then(
            () => {
                alert("request sent");
                window.location.reload()
            });
    }

    detailsChanged(event) {
        this.setState({
            details:
            event.target.value
        });
    }

    render() {
        return (
            <div className=" app-container1">
                <div className="input-group mb-3">
                    <div className="input-group ">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Almost There ;)</span>
                        </div>
                        <textarea onChange={this.detailsChanged} placeholder="Why are you interested in the movie?"
                                  className="form-control" aria-label="With textarea"></textarea>
                    </div>
                    <button type="button" className="btn btn-success" onClick={this.createRequest}>Send Application</button>
                </div>
            </div>
        )
    }
}

export default GenerateRequest;
