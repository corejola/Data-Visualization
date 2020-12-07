import React, { Component } from 'react'
import './SearchField.css';
import axios from 'axios';
import Loader from '../gif/loader.gif';
import stateAbbreviation from '../Utils/stateAbbreviation'
import { TextField, Button, FormControl } from '@material-ui/core';
import TreeMapChart from '../Results/TreeMapChart'
import BarChart from '../Results/BarChart';

class SearchField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: "",
            loading: false,
            mesage: '',
            state: '',
            date: '',
            series: []

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

    handleSubmitForm = (event) => {
        event.preventDefault();
        const query = this.state
        if (query.length < 1) {
            console.log("Missing Value")
        }
        else {
            let abbrev = stateAbbreviation(query)
            this.setState({
                query: '',
                date: ''
            })

            this.queryApi(abbrev)
        }
    }


    queryApi = (query) => {

        const searchUrl = `https://api.covidtracking.com/v1/states/${query}/current.json`;

        if (this.cancel) {
            this.cancel.cancel()
        }
        this.cancel = axios.CancelToken.source()

        axios.get(searchUrl, {
            cancelToken: this.cancel.token
        })
            .then(res => {

                const resultNotFoundMsg = !res.data
                    ? "There are no more search results" : "";

                let newSeries = [
                    {
                        data: [
                            {
                                x: 'Total Tests',
                                y: res.data.totalTestsViral
                            },
                            {
                                x: 'Total Negative Cases',
                                y: res.data.negative
                            },
                            {
                                x: 'Total Positive Cases',
                                y: res.data.positive
                            }
                        ]
                    }
                ]

                this.setState({
                    state: res.data.state,
                    date: res.data.date,
                    series: newSeries,
                    message: resultNotFoundMsg,
                    loading: false,
                })

            })
            .catch(err => {
                if (axios.isCancel(err) || err) {
                    this.setState({
                        loading: false,
                        message: "Failed to Get Data, Please enter a valid US State"
                    })
                }
            })
    }

    render() {
        const { query, loading, message, date, state, series } = this.state

        return (
            <div>
                <h2 className="heading ">Tracking COVID-19 Data by US States</h2>
                {/* Today's Date */}
                <div className="d-flex flex-row">
                    <form onSubmit={this.handleSubmitForm}>
                        <FormControl>

                            <TextField type="text"
                                id="standard-basic"
                                label="Search COVID-19 Cases by US State..."
                                className=""
                                value={query}
                                fullWidth
                                onChange={this.handleInputChange}
                            />

                            <Button className="submit-button" type="submit">Submit</Button>

                        </FormControl>
                    </form>
                </div>

                {message && <p className="message"> {message} </p>}

                <img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'}`} alt="loading" />

                {/* Results Component will take in props from the form */}


                {state &&
                    <TreeMapChart
                        date={date}
                        state={state}
                        series={series}
                    />
                }

                {date && <BarChart />}

            </div>
        )
    }
}

export default SearchField