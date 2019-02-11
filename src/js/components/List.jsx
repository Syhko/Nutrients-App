import React, { Component } from "react";
import { connect } from "react-redux";
import "./List.css"
let DoughnutChart = require("react-chartjs").Doughnut;

const mapStateToProps = state => {
  return {
    remoteArticles: state.remoteArticles,
    displayList: state.displayList
   };
};

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

    console.log(this.props.remoteArticles.map(x => x.name));

    return(
      <div className="list-wrapper">
        <p>TOTAL ENERGY FOR 100 GRAMS : {this.state.Energy}</p>
        <DoughnutChart
          data={chartData}
          options={chartOptions}
        />
      </div>
    );
  }
}

const List = connect(mapStateToProps) (ConnectedList);

export default List;
