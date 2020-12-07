import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';
import { Card, CardContent, Typography, Box } from '@material-ui/core';

export default class BarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {

            series: this.props.data,
            options: {
                chart: {
                    height: 350,
                    type: 'bar',
                    events: {
                        click: function (chart, w, e) {

                        }
                    }
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
                    bar: {
                        columnWidth: '45%',
                        distributed: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                xaxis: {
                    categories: [
                        'Positive Cases',
                        'Positive Case Increase',
                        'Death',
                        'Death Confirmed',
                        'Death Increase',
                        'Death Probable',
                        'Hospitalized',
                        'Cumulative Hospitalized',
                        'Currently Hospitalized',
                        'Hospitalized Increase',
                        'Currently on Ventilator',
                        'Recovered'
                    ],
                    labels: {
                        style: {
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
                            fontSize: '12px'
                        }
                    }
                }
            },
        };
    }



    render() {
        return (
            <Card>
                <CardContent>
                    <div id="chart">
                        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
                    </div>
                </CardContent>
            </Card>
        )
    }
}