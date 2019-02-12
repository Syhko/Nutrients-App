// REACT + REDUX
import React, { Component } from "react";
import { connect } from "react-redux";
// STYLE
import "./List.css"
// PACKAGES
let DoughnutChart = require("react-chartjs").Doughnut;

class ConnectedList extends Component {

  state = {
    Energy: "",
    Protein: "",
    Lipid:"",
    Carbohydrates: ""
  }

  componentWillMount() {
    this.setState({
      Energy: this.props.remoteArticles.find(x=>x.nutrient_id==="208").value,
      Protein: this.props.remoteArticles.find(x=>x.nutrient_id==="203").value,
      Lipid: this.props.remoteArticles.find(x=>x.nutrient_id==="204").value,
      Carbohydrates: this.props.remoteArticles.find(x=>x.nutrient_id==="205").value
    })
  }

  render() {

    const chartData = [
      {
        value: this.state.Protein,
    		color: "#46BFBD",
    		highlight: "#5AD3D1",
    		label: "Protein"
      },
      {
        value: this.state.Lipid,
    		color: "#FDB45C",
    		highlight: "#FFC870",
    		label: "Lipid"
      },
      {
        value: this.state.Carbohydrates,
    		color: "#AC478A",
    		highlight: "#AD5597",
    		label: "Carbohydrates"
      }
    ]

    const chartOptions = {
	     animateRotate : true,
   	   animationSteps : 80,
       animationEasing : "easeOutBounce",
       scaleShowLabels: true,
       responsive: true,
       showTootTips: true,
       maintainAspectRatio: true,
    }

    return(
      <div className="list-wrapper">
        <p className ="energy-text">
          NAME OF THE SELECTION
        </p>
        <p className ="energy-text">
          TOTAL ENERGY FOR 100 GRAMS :
          <span className="energy-value"> {this.state.Energy} </span>
          KCAL
        </p>
        <DoughnutChart
          data={chartData}
          options={chartOptions}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    remoteArticles: state.remoteArticles,
    displayList: state.displayList
   };
};

const List = connect(mapStateToProps) (ConnectedList);

export default List;
