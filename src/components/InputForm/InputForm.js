import React from 'react';
import Grid from '@material-ui/core/Grid';
import classes from './InputForm.module.css';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const InputForm = (props) => {
    const formItems = Object.keys(props.newRecord).map((key, index) => {
        return (
            <Grid xs={12} md={2} item className={classes.InputRow} key={`id_${key}_${index}`}>
                <input type='text' onChange={(event) => props.input(event, key)} value={props.newRecord[key] || ''} />
            </Grid>
        )
    });

    return (
        <Grid container item xs={12} >
            {formItems}
            <Grid xs={12} md={2} item className={classes.InputRow}>
                <Button variant="contained" color="primary" size="small" onClick={props.add} disabled={!props.formValid}>Add Policy</Button>
            </Grid>

            <Divider className={classes.Full} />
        </Grid>
    );
}

export default InputForm;

