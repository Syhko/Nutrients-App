import React, { Component } from "react";
import { connect } from "react-redux";
import { addArticle } from "../actions/index";
import { getData } from "../actions/index";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import "./Form.css";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

//const API_ENDPOINT="https://api.edamam.com/api/food-database/parser"
//const API_KEY="1af405a9174ca834f09b00346cad2598";
//const APP_ID="406cf3c1";

const API_ENDPOINT="https://api.nal.usda.gov/ndb/"
const API_KEY="Lh2TSoClB6kD7xhafikGvJqR8EB09wDeREdcqRDt";

class ConnectedForm extends Component {
  constructor() {
    super();
    this.state = {
      optionList: [],
      foodList: [],
      foodDetails: {},
      ndbno: "",
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  foodFetch = (query) => {
    fetch(`${API_ENDPOINT}search/?format=json&q=`+query+`&sort=n&max=25&offset=0&api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          foodList : data.list.item,
          optionList: data.list.item.map(x => x.name),
          isLoading: false
        })
      })
      .catch(error => console.log(error))
  }

   detailFetch = async (query) => {
    const currentComponent = this;
    await fetch(`${API_ENDPOINT}reports/?ndbno=`+query+`&type=b&format=json&api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const foodDetails = data.report.food.nutrients;
      return currentComponent.setState({ foodDetails }, () => true);
    })
    .catch(error => console.log(error))
  }

  handleChange = (value) => {
    this.setState({ isLoading : true })
    this.foodFetch(value)
  }

  handleSubmit = async (value) => {
    const { foodList } = this.state;
    await this.setState({ ndbno : foodList.find(x => x.name == value).ndbno })
    console.log(this.state.ndbno);
    //let ndbno = foodList.find(x => x.name == selected).ndbno
    //await this.detailFetch(foodList.find(x => x.name == value).ndbno);
    //this.props.getData(foodList.find(x => x.name == value).ndbno);
  }

  getNutrients = () => {
    const { ndbno } = this.state;
    this.props.getData(ndbno)
  }

  render() {
    return(
      <div className="header-form">
        <AsyncTypeahead
          isLoading={false}
          minLength={3}
          delay={800}
          onSearch={this.handleChange}
          className="typeahead-input"
          //onInputChange={this.handleChange}
          onChange={this.handleSubmit}
          options={this.state.optionList}
          placeholder={"Search for food..."}
          clearButton={true}
        />
        <button
          onClick={this.getNutrients}
          className="nutrient-button"
        >
          GET THE NUTRIENTS
        </button>
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

function mapDispatchToProps(dispatch) {
  return {
    getData : remoteArticles => dispatch(getData(remoteArticles))
  };
}

const Form = connect(mapStateToProps, mapDispatchToProps) (ConnectedForm);

export default Form;
