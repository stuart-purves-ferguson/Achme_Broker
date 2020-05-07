import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import classes from './DataRows.module.css';
import DataRow from './DataRow/DataRow'
import Divider from '@material-ui/core/Divider';
import Aux from '../../hoc/Aux_';

const DataRows = (props) => {

    let customers = null;

    if (props.policies) {

        customers = props.policies.map((customer, index) => {
            return (
                <Aux key={`id_${customer.customer_name}_${index}`}>
                    <Grid container item xs={12}  className={classes.DataRows}>

                        <DataRow policyKeys={props.policyKeys} changer={props.changed} customer={customer} passedIndex={index} />

                        <Grid item xs={12} md={2} className={classes.DataRow}>
                            <Button variant="contained" color="secondary" size="small" onClick={() => props.del(index)}>Delete</Button>
                        </Grid>

                    </Grid>
                    <Divider className={classes.Full}/>
                </Aux>
            );
        })
    }
    return <Grid container item xs={12}>{customers}</Grid>;
}

export default DataRows;
