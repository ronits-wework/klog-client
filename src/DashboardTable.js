import ReactTable from 'react-table'
import React, {Component} from 'react';
import 'react-table/react-table.css'

class DashboardTable extends Component {

  render() {
    const data = this.props.complains

    const columns = [{
      Header: 'Text',
      accessor: 'text' // String-based value accessors!
    },

    ]

    return <ReactTable
      data={data}
      columns={columns}
    />
  }

}

export default DashboardTable;


