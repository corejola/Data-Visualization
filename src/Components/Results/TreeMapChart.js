import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import moment from 'moment'

export default class TreeMapChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: this.props.series,
            options: {
                legend: {
                    show: false
                },
                chart: {
                    height: 350,
                    type: 'treemap'
                },
                colors: [
                    '#3B93A5',
                    '#F7B844',
                    '#ADD8C7',
                    '#EC3C65',
                    '#CDD7B6',
                    '#C1F666',
                    '#D43F97',
                    '#1E5D8C',
                    '#421243',
                    '#7F94B0',
                    '#EF6537',
                    '#C0ADDB'
                ],
                plotOptions: {
                    treemap: {
                        distributed: true,
                        enableShades: false
                    }
                }
            },

        };
    }

    componentWillUnmount() {
        this.setState({ series: [] })
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <div id="chart">
                        <Typography variant="h5" component="h2" >
                            <Box textAlign="center">{this.props.state} COVID-19 Data</Box>
                        </Typography>
                        <Typography color="textSecondary">
                            Last modified {moment(this.props.date).format("dddd, MMMM DD, yyyy")}
                        </Typography>
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="treemap"
                            height={400} />
                    </div>
                </CardContent>
            </Card >
        )
    }
}
