import React, { Component } from 'react'
import './SearchField.css';
import axios from 'axios';
import Loader from '../gif/loader.gif';
import stateAbbreviation from '../Utils/stateAbbreviation'
import { TextField, Button, FormControl, Box, Card } from '@material-ui/core';
import TreeMapChart from '../Results/TreeMapChart'

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
            tableData: {}
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

                this.setState({
                    stateSelected: true,
                    usState: res.data.state,
                    date: res.data.dateModified,
                    series: newSeries,
                    tableData: res.data,
                    message: resultNotFoundMsg,
                    loading: false
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
        const { query, loading, message, date, usState, series, stateSelected, tableData } = this.state

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
                                <Button className="submit-button" type="submit" variant="contained" color="primary" >Submit</Button>
                            </FormControl>
                        </form>
                    </Box>
                </Card>

                {message && <p className="message"> {message} </p>}

                <img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'}`} alt="loading" />

                <br />

                {stateSelected && <TreeMapChart
                    date={date}
                    state={usState}
                    series={series}
                />}

                {/* Table Data */}
                {/* {stateSelected && <TreeMapChart tableData={tableData} />} */}

            </div>
        )
    }
}

export default SearchField