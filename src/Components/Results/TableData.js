import React, { Component } from 'react'
import { TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core'

export default class TableData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.tableData
        }
    }

    render() {
        const { positiveCasesViral, positiveIncrease, death, deathConfirmed, deathIncrease, deathProbable, hospitalized, hospitalizedCumulative, hospitalizedCurrently, hospitalizedIncrease, onVentilatorCurrently, recovered } = this.state.data

        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {positiveCasesViral && <TableCell align="center">positiveCasesViral </TableCell>}
                            {positiveIncrease && <TableCell align="center">positiveIncrease </TableCell>}
                            {death && <TableCell align="center">Death</TableCell>}
                            {deathConfirmed && <TableCell align="center">deathConfirmed</TableCell>}
                            {deathIncrease && < TableCell align="center">deathIncrease</TableCell>}
                            {deathProbable && <TableCell align="center">deathProbable</TableCell>}
                            {hospitalized && <TableCell align="center">hospitalized</TableCell>}
                            {hospitalizedCumulative && <TableCell align="center">hospitalizedCumulative</TableCell>}
                            {hospitalizedCurrently && <TableCell align="center">hospitalizedCurrently</TableCell>}
                            {hospitalizedIncrease && <TableCell align="center">hospitalizedIncrease</TableCell>}
                            {onVentilatorCurrently && <TableCell align="center">onVentilatorCurrently</TableCell>}
                            {recovered && <TableCell align="center">recovered</TableCell>}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            {positiveCasesViral && <TableCell align="center">{positiveCasesViral}</TableCell>}
                            {positiveIncrease && <TableCell align="center">{positiveIncrease}</TableCell>}
                            {death && <TableCell align="center">{death}</TableCell>}
                            {deathConfirmed && <TableCell align="center">{deathConfirmed}</TableCell>}
                            {deathIncrease && <TableCell align="center">{deathIncrease}</TableCell>}
                            {deathProbable && <TableCell align="center">{deathProbable}</TableCell>}
                            {hospitalized && <TableCell align="center">{hospitalized}</TableCell>}
                            {hospitalizedCumulative && <TableCell align="center">{hospitalizedCumulative}</TableCell>}
                            {hospitalizedCurrently && <TableCell align="center">{hospitalizedCurrently}</TableCell>}
                            {hospitalizedIncrease && <TableCell align="center">{hospitalizedIncrease}</TableCell>}
                            {onVentilatorCurrently && <TableCell align="center">{onVentilatorCurrently}</TableCell>}
                            {recovered && <TableCell align="center">{recovered}</TableCell>}
                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer >
        )
    }
}
