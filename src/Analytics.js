import React, { Component } from 'react';
import { dataProvider } from "./images/DataProvider";
import {Line as LineChart} from 'react-chartjs';
import './Analytics.css';

class Analytics extends Component {
  state = {
    complaints: [],
    perDayData: this.getPerDayComplaints()
  };

  setComplaints = (complaints) => {
    const perDayData = this.getPerDayComplaints(complaints);
    this.setState({ complaints, perDayData: perDayData });
  };

  componentWillMount (){
    dataProvider.get('https://klog-staging.herokuapp.com/api/v1/complaint')
      .then(this.setComplaints)
      .catch(console.error);
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();

    return day + ' ' + monthNames[monthIndex];
  }

  getPerDayComplaints(complaints) {

    let datesHash = {};
    let dates = [];
    let data = [];

    if (complaints != null) {
      for (let i = 0; i < complaints.length; i++) {
        const created_at = new Date(complaints[i].created_at);
        const key = created_at.getDate() + '.' + created_at.getMonth();
        if (datesHash[key] == null) {
          datesHash[key] = 1;
        }
        else {
          datesHash[key]++;
        }
      }
    }

    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      const currIndex = 7-i-1;
      dates[currIndex] = this.formatDate(date);
      const key = date.getDate()+'.'+date.getMonth();

      if (datesHash[key] == null) {
        data[currIndex] = 0;
      }
      else {
        data[currIndex] = datesHash[key];
      }
    }

    const chartData = {
      labels: dates,
      datasets: [
        {
          label: 'Complaints per day',
          fillColor: 'rgba(151,187,205,0.2)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: data,
        }
      ]
    };

    const chartOptions = {
      scaleShowGridLines: true,
      scaleGridLineColor: 'rgba(0,0,0,.05)',
      scaleGridLineWidth: 1,
      scaleShowHorizontalLines: true,
      scaleShowVerticalLines: true,
      bezierCurve: true,
      bezierCurveTension: 0.4,
      pointDot: true,
      pointDotRadius: 4,
      pointDotStrokeWidth: 1,
      pointHitDetectionRadius: 20,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true,
      legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
    };

    const styles = {
      graphContainer: {
        border: '1px solid black',
        padding: '15px'
      }
    };

    return {
      chartData: chartData,
      chartOptions: chartOptions,
      styles: styles
    }
  }

  render() {
    return (
      <div className={'analytics'}>
        <h1 className={'title'}>Complaint Analytics</h1>
        <h2>Complaints this week</h2>
        <LineChart data={this.state.perDayData.chartData} options={this.state.perDayData.chartOptions} styles={this.state.perDayData.styles} width="300" height="200"/>
      </div>
    );
  }
}

export default Analytics;
