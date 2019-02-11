import React, { Component } from 'react';
import { getData } from "../actions/index";
import { connect } from "react-redux";
import List from "./List";
import Form from "./Form";
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      query: ""
    };
  }

  edamamFetch = () => {
    fetch(`https://api.edamam.com/api/food-database/parser?ingr=chicken&app_id=406cf3c1&app_key=1af405a9174ca834f09b00346cad2598`)
      .then(response => response.json())
      .then(data => {
        console.log(data.hints);
      })
      .catch(error=>console.log(error))
  }

  render() {

    return(
      <div className="app">
        <div className="header">
          <h2>Syhko Food App</h2>
        </div>
        <div className="body">
          <Form />
          {this.props.displayList && <List />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    remoteArticles: state.remoteArticles,
    displayList: state.displayList
  };
}

export default connect(mapStateToProps,{ getData }) (App);
