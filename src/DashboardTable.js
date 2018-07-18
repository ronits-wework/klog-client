import ReactTable from 'react-table'
import React, {Component} from 'react';
import 'react-table/react-table.css'
import Modal from 'react-modal';

Modal.setAppElement('body')

class DashboardTable extends Component {
  state = {
    isModalOpen: false
  };

  handleClick = (state, rowInfo) => {
    const id = rowInfo.original.id
    this.setState({isModalOpen: true})
  }

  closeModal = () => {
    this.setState({isModalOpen: false});
  }

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

    return <div>
      <ReactTable
        getTdProps={(state, rowInfo) => {
          return {onClick: () => this.handleClick(state, rowInfo)}
        }}
        data={data}
        columns={columns}
      />

      <Modal
        isOpen={this.state.isModalOpen}
        onRequestClose={this.closeModal}
        contentLabel="Respond"
      >
        <div>HIIII</div>
        <button onClick={this.closeModal}>close</button>
      </Modal>
    </div>
  }

}

export default DashboardTable;


