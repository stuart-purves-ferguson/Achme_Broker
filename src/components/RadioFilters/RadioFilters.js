import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classes from './RadioFilters.module.css';

const RadioFilters = (props) => {
    const matches = useMediaQuery('(min-width:960px)');

    const radioData = [
        { value: 'more', label: 'Premium £3000 or more' },
        { value: 'less', label: 'Premium less than £3000' },
        { value: 'none', label: 'No filter' }
    ];

    const radioContent = radioData.map((rd, index) => {
        return (
            <FormControlLabel
                style={matches ? { display: 'inline-flex' } : { display: 'block' }}
                key={`${rd.value}_${index}`}
                value={rd.value}
                control={
                    <Radio
                        color='primary'
                    />
                }
                label={rd.label}
            />
        );
    });

    return (
        <Grid item xs={12} className={classes.Spacer}>
            <RadioGroup row style={{ display: 'block' }} onChange={props.filterChange} value={props.radios}>
                {radioContent}
            </RadioGroup>
        </Grid>
    );
}

export default RadioFilters;

