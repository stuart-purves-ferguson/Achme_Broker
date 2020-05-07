import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import classes from './ResetButton.module.css';

const ResetButton = (props) => {
    return (
        <Grid item md={2} xs={12} className={classes.ResetButton}>
            <Button variant="contained" color="primary" size="small" onClick={props.resetButton}>Reset</Button>
        </Grid>
    );
}

export default ResetButton;