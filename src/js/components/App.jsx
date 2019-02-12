import React, { Component } from 'react';
import { getData } from "../actions/index";
import { connect } from "react-redux";
import List from "./List";
import Form from "./Form";
import './App.css';
import Syhko_logo from '../../logos/Syhko_logo.png';
import USDA_logo from '../../logos/USDA_logo.png';
import GitHub_logo from '../../logos/GitHub_logo.png';

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
        <div className="USDA-content">
          <p className="text">Powered by</p>
          <a href="https://ndb.nal.usda.gov/ndb/search/list?home=true" target="_blank" rel="noopener noreferrer">
            <img
              src={USDA_logo}
              width="100"
              alt="USDA_logo"
            />
          </a>
        </div>
        <a href="https://github.com/Syhko" target="_blank" rel="noopener noreferrer">
          <img
            className="github-logo"
            src={GitHub_logo}
            width="100"
            alt="GitHub_logo"
          />
        </a>
        <div className="header">
          <img
            src={Syhko_logo}
            alt="Syhko_logo"
          />
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
