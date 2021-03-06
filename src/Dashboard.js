import React, {Component} from 'react';
import {dataProvider} from "./images/DataProvider";
import DashboardTable from "./DashboardTable";
import './Dashboard.css';

class Dashboard extends Component {
  state = {
    complains: []
  };

  setComplains = (complains) => {
    this.setState({complains});
  };

  componentWillMount() {
    dataProvider.get('https://klog-staging.herokuapp.com/api/v1/complaint')
      .then(this.setComplains)
      .catch(console.error);
  }

  render() {
    let complains = this.state.complains
    return (
      <div className="dashboard container">
        <h1>Dashboard</h1>
        <div className={"analytics"}>
          <a href={'/analytics'}>Go to analytics</a>
        </div>
        <DashboardTable complains={complains}/>
      </div>
    );
  }
}

export default Dashboard;
