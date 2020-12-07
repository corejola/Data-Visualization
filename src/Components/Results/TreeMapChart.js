import React, { Component } from 'react';
import Chart from 'react-apexcharts';

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
                title: {
                    text: `Tracking Covid Data: ${this.props.state}`,
                    align: 'center'
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



    componentDidMount() {

    }

    componentWillUnmount() {
        this.setState({ series: [] })
    }

    render() {
        return (

            <div id="chart">
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="treemap"
                    height={400} />
            </div>

        )
    }
}
