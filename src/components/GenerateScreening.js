import React from 'react';



class GenerateScreening extends React.Component {
    constructor() {
        super();
        //this.MovieService = MovieService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.detailsChanged = this.detailsChanged.bind(this);
        this.createScreening = this.createScreening.bind(this);
        this.venueChanged = this.venueChanged.bind(this);
        this.dateChanged = this.dateChanged.bind(this);
        this.state ={
            title:"",
            details:"",
            venue:"",
            screeningDate:""
        }


    }


    createScreening(){

        let screening ={
            title:this.state.title,
            details:this.state.details,
            venue:this.state.venue,
            screeningTime:this.state.screeningDate
        };
        fetch("https://moviewalk.herokuapp.com/api/"+this.props.movieId +"/screening", {
            body: JSON.stringify(screening),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials:"include"
        }).then(function (response) {
            return response.json();
        }).then(response => {alert("screening added");
        window.location.reload()});





    }

    dateChanged(event) {
        this.setState({
            screeningDate:
            event.target.value

        });
    }

    venueChanged(event) {
        this.setState({
            venue:
            event.target.value

        });
    }


    titleChanged(event) {
        this.setState({
            title:
            event.target.value

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
            <div className="app-container1">

                <div className="input-group mb-3">

                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">Screening title</span>
                    </div>
                    <input onChange={this.titleChanged} type="text" className="form-control" placeholder="enter the title of the screening"
                    />

                </div >

                <div className="input-group mb-3">

                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">Screening venue</span>
                    </div>
                    <input onChange={this.venueChanged} type="text" className="form-control" placeholder="enter the screening venue"
                    />

                </div >


                <div className="input-group ">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Screening Time</span>
                    </div>
                    <input type="datetime-local" onChange={this.dateChanged}/>
                </div>

                <div className="input-group ">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Screening Agenda </span>
                    </div>
                    <textarea onChange={this.detailsChanged} className="form-control" aria-label="With textarea"></textarea>
                </div>

                <button type="button" className="btn btn-success btn-block"  onClick={this.createScreening}>Add Screening</button>

            </div>



        )
    }
}
export default GenerateScreening;
