import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import request from 'superagent';

import './rides.css';

export default class Rides extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rideRequests: [],
            rideRequestsLoaded: false,
            acceptedRides: [],
            acceptedRidesLoaded: false,
            rideHistory: [],
            rideHistoryLoaded: false
        }
    }

    componentDidMount() {
        request
            .get('http://krew-dev-api.herokuapp.com/rideRequests')
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) throw err;
                this.setState({
                    rideRequests: res.body,
                    rideRequestsLoaded: true
                });
            });
    }

    render() {
        var rideRequests = this.state.rideRequests.map(rideRequest => 
            <div key={rideRequest._id}>
                Origin: {rideRequest.origin} -> Destination: {rideRequest.destination}
            </div>    
        );

        return(
            <Grid fluid className="rides-dash">
                <Row>
                    <h1>Ride Requests</h1>
                </Row>
                <Row>
                    <small>These rides have not yet been accepted by drivers.</small>
                </Row>
                <Row>
                    {rideRequests}
                </Row>
                <Row>
                    <h1>Accepted Rides</h1>
                </Row>
                <Row>
                    <small>These rides have been accepted by drivers, but have not been taken.</small>
                </Row>
                <Row>
                    <h1>Ride History</h1>
                </Row>
                <Row>
                    <small>This is the entire ride history.</small>
                </Row>
            </Grid>
        );
    }
}