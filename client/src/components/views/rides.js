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
            acceptedRideColumns: [
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
                    name: 'Driver'
                }
            ],
            rideRequests: [],
            acceptedRides: [],
            rideHistory: []
        }
    }

    componentDidMount() {
        request
            .get('https://krew-dev-api.herokuapp.com/rides/rideRequests?key=test')
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) throw err;
                console.log(res);
                this.setState({
                    rideRequests: res.body
                });
            });

        request
            .get('https://krew-dev-api.herokuapp.com/rides/acceptedRides?key=test')
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) throw err;
                this.setState({
                    acceptedRides: res.body
                });
            });
    }

    rideRequestRowGetter = (i) => {
        return this.state.rideRequests[i];
    }

    acceptedRideRowGetter = (i) => {
        return this.state.acceptedRides[i];
    }

    handleRideRequestUpdate = ({ fromRow, toRow, updated}) => {
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
                    <Col md={12} lg={5}>
                        <Row>
                            <h1>Ride Requests</h1>
                        </Row>
                        <Row>
                            <small>These rides have not yet been accepted by drivers.</small>
                        </Row>
                        <ReactDataGrid 
                            className="rides-table"
                            enableCellSelect={true}
                            rowGetter={this.rideRequestRowGetter}
                            rowsCount={this.state.rideRequests.length}
                            columns={this.state.rideRequestColumns}    
                            onGridRowsUpdated={this.handleRideRequestUpdate}
                        />
                    </Col>
                    <Col md={12} lg={5} lgOffset={1}>
                        <Row>
                            <h1>Accepted Rides</h1>
                        </Row>
                        <Row>
                            <small>These rides have been accepted by drivers, but have not been taken.</small>
                        </Row>
                        <ReactDataGrid 
                            rowGetter={this.acceptedRideRowGetter}
                            rowsCount={this.state.acceptedRides.length}
                            columns={this.state.acceptedRideColumns}    
                        />
                    </Col>
                </Row>
                
                <Row>
                    
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