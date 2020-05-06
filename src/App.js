import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';

import data from './data/data.json'
// import axios from 'axios';

import classes from './App.module.css';

class App extends Component {

  state = {
    sortDirection: [null, null, null, null, null],
    policies: null,
    client: null,
    headers: null,
    newRecord: {
      customer_name: '',
      customer_address: '',
      premium: '',
      policy_type: '',
      insurer_name: ''
    },
    formValid: false,
    filterPolicies: null,
  }

  componentDidMount() {
    // console.log(data, Object.keys(data.client.policies[0]))

    //set state from JSON
    this.setState({
      policies: data.client.policies,
      client: data.client.name,
      headers: Object.keys(data.client.policies[0]),     //get headers from JSON
      filterPolicies: data.client.policies,
    });
  }

  restHandler = () => {
    this.setState({
      sortDirection: [null, null, null, null, null],
      policies: data.client.policies,
      client: data.client.name,
      headers: Object.keys(data.client.policies[0]),
      newRecord: {
        customer_name: '',
        customer_address: '',
        premium: '',
        policy_type: '',
        insurer_name: ''
      },
      formValid: false,
      filterPolicies: data.client.policies
    });
  }

  handleFilterChange = (event) => {

    const filterArr = [...this.state.filterPolicies];

    let filtered;
    switch (event.target.value) {
      case 'more':
        filtered = filterArr.filter((f) => {
          return f.premium >= 3000
        });
        break;
      case 'less':
        filtered = filterArr.filter((f) => {
          return f.premium < 3000
        });
        break;
      default:
        filtered = this.state.filterPolicies;
    }

    this.setState({
      policies: filtered
    });
  }

  inputHandler = (event, field) => {
    const newObj = { ...this.state.newRecord };
    newObj[field] = event.target.value;

    this.setState({
      newRecord: newObj
    });

    this.setState((prevState) => {

      const newRecordObj = prevState.newRecord
      const newRecordKeys = Object.keys(newRecordObj);

      const validCount = newRecordKeys
        .map((key) => {
          return newRecordObj[key];
        })
        .filter((record) => {
          return record.length > 0;
        });

      return {
        formValid: validCount.length === newRecordKeys.length
      }
    });
  }


  addHandler = () => {
    this.setState((prevState) => {
      return {
        policies: prevState.filterPolicies,
      }
    });
    const newArr = [...this.state.filterPolicies, this.state.newRecord];

    this.setState({
      newRecord: {
        customer_name: '',
        customer_address: '',
        premium: '',
        policy_type: '',
        insurer_name: ''
      },
      formValid: false,
      policies: newArr,
      filterPolicies: newArr
    });
  }

  deleteHandler = (index) => {
    this.setState((prevState) => {
      return {
        policies: prevState.filterPolicies,
      }
    });

    const newArr = [...this.state.filterPolicies];
    newArr.splice(index, 1);

    this.setState({
      policies: newArr,
      filterPolicies: newArr
    });
  }

  changeDataHandler = (event, col, index) => {
    this.setState((prevState) => {
      return {
        policies: prevState.filterPolicies,
      }
    });

    const newArr = [...this.state.policies];
    newArr[index][col] = event.target.value;

    this.setState({
      policies: newArr,
      filterPolicies: newArr
    });
  }

  //handle clicks on table headers
  headerClickHandler = (event) => {
    console.log(event.target.id)

    let policiesArr = [...this.state.policies];
    const dataType = event.target.id;
    const sortIndex = event.target.getAttribute('data-index');

    if (dataType === 'premium') {
      policiesArr.sort((a, b) => {
        let numA = Number(a[dataType]);
        let numB = Number(b[dataType]);

        if (!this.state.sortDirection[sortIndex] || this.state.sortDirection[sortIndex] === 'DESC') {
          return (numA < numB) ? -1 : (numA > numB) ? 1 : 0;
        }
        else {
          return (numA > numB) ? -1 : (numA < numB) ? 1 : 0;
        }
      });
    }

    else if (dataType === 'customer_address') {

      policiesArr.sort((a, b) => {
        let arrA = a[dataType].toUpperCase().split(' ');
        let arrB = b[dataType].toUpperCase().split(' ');

        if (arrA.length > 1) {
          arrA.shift();
        }
        if (arrB.length > 1) {
          arrB.shift();
        }

        let textAA = arrA.join(' ');
        let textBB = arrB.join(' ');

        if (!this.state.sortDirection[sortIndex] || this.state.sortDirection[sortIndex] === 'DESC') {
          return (textAA < textBB) ? -1 : (textAA > textBB) ? 1 : 0;
        }
        else {
          return (textAA > textBB) ? -1 : (textAA < textBB) ? 1 : 0;
        }
      });
    }
    else {
      policiesArr.sort((a, b) => {
        let textA = a[dataType].toUpperCase();
        let textB = b[dataType].toUpperCase();
        if (!this.state.sortDirection[sortIndex] || this.state.sortDirection[sortIndex] === 'DESC') {
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }
        else {
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
        }
      });
    }

    let direction = 'DESC'
    if (!this.state.sortDirection[sortIndex] || this.state.sortDirection[sortIndex] === 'DESC') {
      direction = 'ASC';
    }

    let sortDirectionNew = [null, null, null, null, null];
    sortDirectionNew[sortIndex] = direction;

    this.setState({
      policies: policiesArr,
      filterPolicies: policiesArr,
      sortDirection: sortDirectionNew
    });
  }

  render() {

    let headers = (
      <TableCell>
        <p>Loading...</p>
      </TableCell>
    );

    if (this.state.headers) {
      headers = this.state.headers.map((header, index) => {

        //get nicely formatted display headeers to show on the page
        const displayHeader = header.split('_').map((headerPart) => {
          return headerPart.charAt(0).toUpperCase().concat(headerPart.slice(1));
        }).join(' ');

        //create a component tag in the correct format
        let HeaderTag = header.replace('_', '');
        HeaderTag = HeaderTag.charAt(0).toUpperCase().concat(HeaderTag.slice(1));

        return (
          <TableCell key={`id_${header}_${index}`}>
            <HeaderTag is='custom' onClick={this.headerClickHandler} id={header} data-index={index}>
              {displayHeader}{this.state.sortDirection[index] === 'ASC' ? <span>&gt;</span> : this.state.sortDirection[index] === 'DESC' ? <span>&lt;</span> : <span className={classes.hidden}>_</span>}
            </HeaderTag>
          </TableCell >
        );
      })
    }

    let customers = (
      <TableRow>
        <TableCell>
          <p>Loading...</p>
        </TableCell>
      </TableRow>
    );

    if (this.state.policies) {

      customers = this.state.policies.map((customer, index) => {
        return (
          <TableRow key={`id_${customer.customer_name}_${index}`}>
            <TableCell><input type='text' value={customer.customer_name} onChange={(event) => this.changeDataHandler(event, 'customer_name', index)}></input></TableCell>
            <TableCell><input type='text' value={customer.customer_address} onChange={(event) => this.changeDataHandler(event, 'customer_address', index)}></input></TableCell>
            <TableCell><input type='text' value={customer.premium} onChange={(event) => this.changeDataHandler(event, 'premium', index)}></input></TableCell>
            <TableCell><input type='text' value={customer.policy_type} onChange={(event) => this.changeDataHandler(event, 'policy_type', index)}></input></TableCell>
            <TableCell><input type='text' value={customer.insurer_name} onChange={(event) => this.changeDataHandler(event, 'insurer_name', index)}></input></TableCell>
            <TableCell><Button variant="contained" color="secondary" onClick={() => this.deleteHandler(index)}>Delete</Button></TableCell>
          </TableRow>
        );
      })
    }
    return (
      <div className={classes.App}>
        <Container fixed>
          <Paper elevation={3}>
            <Typography variant="h2">
              {this.state.client}
            </Typography>
            <p>Online policy database. Columns can be sorted by clicking on the column headings.</p>
            <RadioGroup row style={{ display: 'block' }} onChange={this.handleFilterChange} defaultValue='none'>
              <FormControlLabel
                value='more'
                control={
                  <Radio
                    color='primary'
                  />
                }
                label='Premium £3000 or more'
              />
              <FormControlLabel
                value='less'
                control={
                  <Radio
                    color='primary'
                  />
                }
                label='Premium less than £3000'
              />
              <FormControlLabel
                value='none'
                control={
                  <Radio

                    color='primary'
                  />
                }
                label='No filter'
              />
            </RadioGroup>
            <Table>
              <TableHead>
                <TableRow>
                  {headers}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers}
                <TableRow>
                  <TableCell>
                    <input type='text' onChange={(event) => this.inputHandler(event, 'customer_name')} value={this.state.newRecord['customer_name'] || ''} />
                  </TableCell>
                  <TableCell>
                    <input type='text' onChange={(event) => this.inputHandler(event, 'customer_address')} value={this.state.newRecord['customer_address'] || ''} />
                  </TableCell>
                  <TableCell>
                    <input type='text' onChange={(event) => this.inputHandler(event, 'premium')} value={this.state.newRecord['premium'] || ''} />
                  </TableCell>
                  <TableCell>
                    <input type='text' onChange={(event) => this.inputHandler(event, 'policy_type')} value={this.state.newRecord['policy_type'] || ''} />
                  </TableCell>
                  <TableCell>
                    <input type='text' onChange={(event) => this.inputHandler(event, 'insurer_name')} value={this.state.newRecord['insurer_name'] || ''} />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={this.addHandler} disabled={!this.state.formValid}>Add Policy</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className={classes.Spacer}>
              <Button variant="contained" color="primary" onClick={this.restHandler} >Reset</Button>
            </div>
            <footer>
              <span>Created by Stuart Ferguson</span>
            </footer>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default App;
