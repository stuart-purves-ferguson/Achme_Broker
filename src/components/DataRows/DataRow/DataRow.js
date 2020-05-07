
import React from 'react';
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import classes from './DataRow.module.css';


const DataRow = (props) => {
    const item = props.policyKeys.map((keye, index) => {
        return (
            <Grid item xs={12} md={2} className={classes.DataRow} key={`${keye}_${index}`}>
                <p className={classes.Mobile}><strong>{keye.replace('_', ' ')}</strong></p>
                <input type='text' value={props.customer[keye]} onChange={(event) => props.changer(event, keye, props.passedIndex)}></input>
            </Grid>
        )
    });

    return item;
}
export default DataRow;