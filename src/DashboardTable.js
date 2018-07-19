import ReactTable from 'react-table'
import React, {Component} from 'react';
import 'react-table/react-table.css'
import Modal from 'react-modal';
import {dataProvider} from "./images/DataProvider";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('body')

class DashboardTable extends Component {
  state = {
    isModalOpen: false,
    response: {
      id: '',
      text: ''
    }
  };

  handleClick = (state, rowInfo) => {
    var response = {...this.state.response}
    response.id = rowInfo.original.id;
    this.setState({response})
    this.setState({isModalOpen: true})
  }

  SendResponse = () => {
    const response = this.state.response;

    this.setState({isModalOpen: false});
    dataProvider.post('https://klog-staging.herokuapp.com/api/v1/complaint/reply', {id: response.id, message: response.text})
  }

  handleChangeResponse = (e) => {
    var response = {...this.state.response}
    response.text = e.target.value;
    this.setState({response})
  }

  render() {
    const data = this.props.complains

    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: name => name.length ? name : 'Anonymous'
      },
      {
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
          return {
            onClick: () => this.handleClick(state, rowInfo),
            style: {
              'white-space': 'unset'
            }
          }
        }}
        data={data}
        columns={columns}
      />

      <Modal
        isOpen={this.state.isModalOpen}
        onRequestClose={this.SendResponse}
        contentLabel="Respond"
        style={customStyles}
      >
        <div>Respond to the poor guy</div>
        <input
          type="text"
          value={this.state.response.text}
          onChange={this.handleChangeResponse}
        />
        <button onClick={this.SendResponse}>Send</button>
      </Modal>
    </div>
  }

}

export default DashboardTable;


