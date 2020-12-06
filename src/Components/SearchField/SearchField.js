import React, { Component } from 'react'
import './SearchField.css';
// import axios from 'axios';
import Loader from '../gif/loader.gif';
import { TextField, Button, FormControl } from '@material-ui/core';

class SearchField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: "",
            results: [],
            loading: false,
            mesage: '',
            state: ''
        }
        this.cancel = ''

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    // populate page with all data rows...
    // componentDidMount() {
    // const url = '/findAll'
    // axios.get(url).then(res => {
    //     this.setState({
    //         results: res.data
    //     })
    // }).catch(err => {
    //     console.log(err)
    // })
    // }

    handleInputChange = event => {
        event.preventDefault();
        const query = event.target.value
        this.setState({
            query
        })
    }

    handleSubmitForm = (event) => {
        event.preventDefault();
        console.log(this.state.query)
    }

    // get search results
    // getSearchResults = (query) => {

    //     const searchUrl = `https://api.covidtracking.com/v1/states/${query}/current.json`;

    //     if (this.cancel) {
    //         this.cancel.cancel()
    //     }
    //     this.cancel = axios.CancelToken.source()

    //     axios.get(searchUrl, {
    //         cancelToken: this.cancel.token
    //     })
    //         .then(res => {
    //             console.log(res.data)
    //             const resultNotFoundMsg = !res.data.length
    //                 ? "There are no more search results" : "";
    //             this.setState({
    //                 results: res.data,
    //                 message: resultNotFoundMsg,
    //                 loading: false
    //             })
    //         })
    //         .catch(err => {
    //             if (axios.isCancel(err) || err) {
    //                 this.setState({
    //                     loading: false,
    //                     message: "Failed to Get Data"
    //                 })
    //             }
    //         })
    // }


    render() {
        const { query, loading, message } = this.state

        return (
            <div>
                <h2 className="heading ">Tracking COVID-19 Data by US States</h2>

                <div className="d-flex flex-row">
                    <form onSubmit={this.handleSubmitForm}>
                        <FormControl>

                            <TextField type="text"
                                id="standard-basic"
                                label="Search COVID-19 Cases by US State..."
                                className=""
                                value={query}
                                onChange={this.handleInputChange}
                            />

                            <Button className="submit-button" type="submit">Submit</Button>

                        </FormControl>
                    </form>
                </div>

                {/* Error Message */}
                {message && <p className="message"> {message} </p>}

                {/* loading... */}
                <img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'}`} alt="loading" />

                {/* Results Component will take in props from the form */}

            </div>
        )
    }
}

export default SearchField