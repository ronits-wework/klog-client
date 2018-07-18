import React, { Component } from 'react';
import { dataProvider } from "./images/DataProvider";
import DashboardTable from "./DashboardTable";

class Dashboard extends Component {
  state = {
    complains: []
  };

  setComplains = (complains) => {
    this.setState({ complains });
  };

  componentWillMount (){
    dataProvider.get('https://klog-staging.herokuapp.com/api/v1/complaint')
      .then(this.setComplains)
      .catch(console.error);
  }

  render() {
    let complains = this.state.complains
    return (
      <div>
        <div>This is a dashboard</div>
        <DashboardTable complains={complains}/>
      </div>
    );
  }
}

export default Dashboard;
