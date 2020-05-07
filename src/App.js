import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableHead from '@material-ui/core/TableHead';
// import TableCell from '@material-ui/core/TableCell';
// import TableRow from '@material-ui/core/TableRow';
// import Button from '@material-ui/core/Button';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Headers from './components/Headers/Headers';
import DataRows from './components/DataRows/DataRows';
import InputForm from './components/InputForm/InputForm';
import RadioFilters from './components/RadioFilters/RadioFilters';
import Footer from './components/Footer/Footer';
import ResetButton from './components/ResetButton/ResetButton';
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
    radios: 'none'
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

  resetHandler = () => {
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
      filterPolicies: data.client.policies,
      radios: 'none'
    });

    window.location.href='/build';
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
      policies: filtered,
      radios: event.target.value
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
      filterPolicies: newArr,
      radios: 'none'
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
      filterPolicies: newArr,
      radios: 'none'
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

    //sorting for 3 types (numbers, text and text that begins with a number)
    //should be condensed (DRY) but code is reused a couple of times

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

    //sort directions
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

    return (
      <div className={classes.App}>
        <Container maxWidth="lg"  >
          <Paper elevation={3} className={classes.Float}>
            <Grid container item xs={12} justify="center">
              <Grid item xs={12} >
                <Typography variant="h2">
                  {this.state.client}
                </Typography>
              </Grid>
              <Grid item xs={10} >
                <p>Online policy database. Columns can be sorted by clicking on the column headings.</p>
              </Grid>

              <RadioFilters filterChange={this.handleFilterChange} radios={this.state.radios} />
              <Headers headers={this.state.headers} sortDirection={this.state.sortDirection} headerClick={this.headerClickHandler} />
              <DataRows policies={this.state.policies} del={this.deleteHandler} changed={this.changeDataHandler} policyKeys={Object.keys(this.state.newRecord)} />
              <InputForm newRecord={this.state.newRecord} formValid={this.state.formValid} add={this.addHandler} input={this.inputHandler} />

              <ResetButton resetButton={this.resetHandler} />
              <Footer />
            </Grid>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default App;
