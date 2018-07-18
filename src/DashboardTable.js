import ReactTable from 'react-table'
import React, {Component} from 'react';
import 'react-table/react-table.css'

class DashboardTable extends Component {

  render() {
    const data = this.props.complains

    const columns = [{
      Header: 'Text',
      accessor: 'text'
    },
      {
        Header: 'Image',
        accessor: 'asset_url',
        Cell: url => <img src={url.value} height="200" width="200"/>
      },
    ]

    return <ReactTable
      data={data}
      columns={columns}
    />
  }

}

export default DashboardTable;


