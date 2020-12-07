import React, { Component } from 'react'
import './SearchField.css';
import axios from 'axios';
import Loader from '../gif/loader.gif';
import stateAbbreviation from '../Utils/stateAbbreviation'
import { TextField, Button, FormControl, Box, Card } from '@material-ui/core';
import TreeMapChart from '../Results/TreeMapChart'
import TableData from '../Results/TableData'
import BarChart from '../Results/BarChart'


class SearchField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: "",
            loading: false,
            mesage: '',
            usState: '',
            stateSelected: false,
            date: '',
            series: [],
            tableData: {},
            chartData: []
        }
        this.cancel = ''
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleInputChange = event => {
        event.preventDefault();
        const query = event.target.value
        this.setState({
            query
        })
    }

    clearState() {
        this.setState({
            query: '',
            date: '',
            series: [],
            tableData: {},
            stateSelected: false,
            loading: true
        })
    }
    handleSubmitForm = (event) => {
        event.preventDefault();

        let query = this.state
        let abbrev = stateAbbreviation(query)

        this.clearState()

        this.queryApi(abbrev)
    }

    queryApi = (query) => {

        const searchUrl = `/search=${query}`;

        if (this.cancel) {
            this.cancel.cancel()
        }
        this.cancel = axios.CancelToken.source()

        axios.get(searchUrl, {
            cancelToken: this.cancel.token
        })
            .then(res => {
                if (res.data.error) {
                    this.setState({
                        loading: false,
                        message: "Data not found, Please enter a valid US State."
                    })
                }
                else {
                    let newSeries = [
                        {
                            data: [
                                {
                                    x: 'Currently Hospitalized ',
                                    y: res.data.hospitalizedCurrently
                                },
                                {
                                    x: 'Currently in ICU',
                                    y: res.data.inIcuCurrently
                                },
                                {
                                    x: 'Deaths',
                                    y: res.data.death
                                },
                                {
                                    x: 'Hospitalized Increase',
                                    y: res.data.hospitalizedIncrease
                                },
                                {
                                    x: 'Total Hospitalized',
                                    y: res.data.hospitalized
                                },
                                {
                                    x: 'Postive Increase',
                                    y: res.data.positiveIncrease
                                }
                            ]
                        }
                    ]
                    let barChartData = [{
                        data: [res.data.positiveCasesViral, res.data.positiveIncrease, res.data.death, res.data.deathConfirmed, res.data.deathIncrease, res.data.deathProbable, res.data.hospitalized, res.data.hospitalizedCumulative, res.data.hospitalizedCurrently, res.data.hospitalizedIncrease, res.data.onVentilatorCurrently, res.data.recovered]
                    }]

                    this.setState({
                        stateSelected: true,
                        usState: res.data.state,
                        date: res.data.dateModified,
                        series: newSeries,
                        chartData: barChartData,
                        tableData: res.data,
                        loading: false,
                        message: ''
                    })
                }
            })
            .catch(err => {
                console.log(err)
                if (axios.isCancel(err) || err) {
                    this.setState({
                        loading: false,
                        message: "Data not found, Please enter a valid US State."
                    })
                }
            })
    }

    render() {
        const { query, loading, message, date, usState, series, stateSelected, tableData, chartData } = this.state

        return (
            <div>
                <Card>
                    <h2 className="heading ">Tracking COVID-19 Data by US States</h2>
                    <Box textAlign="center" width={600}>
                        <form onSubmit={this.handleSubmitForm}>
                            <FormControl >
                                <TextField
                                    type="text"
                                    id="standard-basic"
                                    label="Search COVID-19 Cases by US State..."
                                    value={query}
                                    onChange={this.handleInputChange}
                                    className="form-input"
                                    fullWidth />
                                <Button className="submit-button" type="submit" variant="contained" color="primary" >Search</Button>
                            </FormControl>
                        </form>
                    </Box>
                </Card>

                <br />
                {message && <Card>
                    <Box className="message" textAlign="center">
                        {message}
                    </Box> </Card>}

                <img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'}`} alt="loading" />

                <br />
                {stateSelected && <TreeMapChart date={date} state={usState} series={series} />}

                <br />
                {stateSelected && <BarChart data={chartData} />}

                <br />
                {stateSelected && <TableData tableData={tableData} />}

            </div>
        )
    }
}

export default SearchField