import React from 'react';
import './App.scss';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import List from './List';
import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';

class App extends React.Component {
  state = {
    isLoading: false,
    user: [],
    user_more: [],
    id: '',
    first_name: '',
    last_name: '',
    show: false,
    redirectref: false
  }

  handleClose = e => {
    this.setState({
      show: false
    })
  }

  handleClick = (p1, p2, p3, e) => {
    setTimeout(this.setState({
      id: Number(p1),
      first_name: p2,
      last_name: p3,
    }), 90000)
  }

  handleModal = (p1, p2, p3, e) => {
    this.setState({
      id: Number(p1),
      first_name: p2,
      last_name: p3,
      show: true
    })
  }

  componentDidMount() {
    axios.get('https://reqres.in/api/users?page=2')
      .then(res => {
        this.setState({
          user: res.data.data,
          user_more: res.data
        })
      })
      .then(this.setState({
        isLoading: false
      }))
      .catch(function (error) {
        console.log(error);
      })
  }
  render() {
    const { isLoading, id, first_name, last_name } = this.state;
    return (
      <Router>
        <div>
          <h4>User Crud Application</h4>
          <Link to="/list" >Record List</Link>|
          <Link to="/list/new">Add Record</Link>
          <p>{isLoading ? 'Please wait while we are getting user detail.....' : ''}</p>
        </div>
        <Switch>
          <Route exact path="/list/new" Component={Add}><Add /></Route>
          <Route path="/list/new/:id?" >
            <Edit id={id} first_name={first_name} last_name={last_name} />
          </Route>
          <Route path="/list">
            <List user={this.state.user}
              handleClick={this.handleClick}
              handleModal={this.handleModal}
              handleClose={this.handleClose}
              user_more={this.state.user_more} />
          </Route>
        </Switch>

        <Delete id={id}
          handleClose={this.handleClose}
          show={this.state.show} />
      </Router>
    )
  }
}

export default App;
