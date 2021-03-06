import ReactTable from 'react-table'
import React, {Component} from 'react';
import 'react-table/react-table.css'
import Modal from 'react-modal';
import {dataProvider} from "./images/DataProvider";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  },
  compImage: {
    display: 'block',
  },
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
    dataProvider.post('https://klog-staging.herokuapp.com/api/v1/complaint/reply', {
      id: response.id,
      message: response.text
    })
  }

  closeModal = () => {
    this.setState({isModalOpen: false});
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
        Cell: name => {
          const real_name = name.value;
          if (real_name == null || real_name == '') {
            return 'Anonymous';
          } else {
            return real_name;
          }
        }
      },
      {
        Header: 'Text',
        accessor: 'text'
      },
      {
        Header: 'Image',
        accessor: 'asset_url',
        Cell: url => <img src={url.value} width="120"/>
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
        onRequestClose={this.closeModal}
        contentLabel="Respond"
        style={customStyles}
      >
        <img className={"compImage"} src="https://s3.amazonaws.com/tinycards/image/a2e3248975bfbf1f485eee53f527aa83"
             width="130"/>
        <div>Respond to the poor guy</div>
        <input
          className={"inputText"}
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


