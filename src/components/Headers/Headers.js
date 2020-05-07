import React from 'react';
import Grid from '@material-ui/core/Grid';
import classes from './Headers.module.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';

const Headers = (props) => {
    const matches = useMediaQuery('(min-width:960px)');

    let headers = null;

    if (props.headers && matches) {
        headers = props.headers.map((header, index) => {

            //get nicely formatted display headeers to show on the page
            const displayHeader = header.split('_').map((headerPart) => {
                return headerPart.charAt(0).toUpperCase().concat(headerPart.slice(1));
            }).join(' ');

            //create a component tag in the correct format
            let HeaderTag = header.replace('_', '');
            HeaderTag = HeaderTag.charAt(0).toUpperCase().concat(HeaderTag.slice(1));

            return (
                <Grid item xs={2} key={`id_${header}_${index}`} className={classes.TH}>
                    <HeaderTag is='custom' onClick={props.headerClick} id={header} data-index={index}>
                        {displayHeader}{props.sortDirection[index] === 'ASC' ? <span>&gt;</span> : props.sortDirection[index] === 'DESC' ? <span>&lt;</span> : <span className={classes.hidden}>_</span>}
                    </HeaderTag>
                </Grid>
            );
        })
    }
    return (
        <Grid container item xs={12}>
            {headers}
            <Divider className={classes.Full} />
        </Grid>
    );
}

export default Headers;