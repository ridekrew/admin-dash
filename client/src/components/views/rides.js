import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import request from 'superagent';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';

import './rides.css';

export default class Rides extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rideRequestColumns: [
                {
                    key: 'origin',
                    name: 'Origin'
                },
                {
                    key: 'destination',
                    name: 'Destination'
                },
                {
                    key: 'time',
                    name: 'Time'
                },
                {
                    key: 'date',
                    name: 'Date'
                },
                {
                    key: 'driver',
                    name: 'Driver',
                    editable: true
                }
            ],
            rideRequests: [],
            acceptedRides: [],
            rideHistory: []
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

    rideRequestRowGetter = (i) => {
        return this.state.rideRequests[i];
    }

    handleRideRequestUpdate = ({ fromRow, toRow, updated}) => {
        console.log(fromRow, toRow, updated);
        let rideRequests = this.state.rideRequests.slice();

        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rideRequests[i];
            let updatedRow = update(rowToUpdate, {$merge: updated});
            rideRequests[i] = updatedRow;
        }

        this.setState({ 
            rideRequests: rideRequests
         });
    }

    render() {

        return(
            <Grid fluid className="rides-dash">
                <Row>
                    <h1>Ride Requests</h1>
                </Row>
                <Row>
                    <small>These rides have not yet been accepted by drivers.</small>
                </Row>
                <Row>
                    <ReactDataGrid 
                        enableCellSelect={true}
                        rowGetter={this.rideRequestRowGetter}
                        rowsCount={this.state.rideRequests.length}
                        columns={this.state.rideRequestColumns}    
                        onGridRowsUpdated={this.handleRideRequestUpdate}
                    />
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