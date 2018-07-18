import React, {Component} from 'react';
import './ComplainForm.css';
import Toggle from 'react-toggle';
import './react-toggle.css'

class ComplainForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      complaintText: '',
      isAnonymous: true,
      uploadedFile: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleChange(event) {
    this.setState({complaintText: event.target.value});
  }

  handleSubmit(event) {
    const data = JSON.stringify(
      {
        name: '',
        text: this.state.complaintText,
        asset_url: ''
      }
    );

    fetch("http://localhost:3001/api/v1/complaint",
      {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(result => {
        alert('We feel your pain!');
      }
    );


  }

  handleFileSelected(event) {
    this.setState({uploadedFile: event.target.files[0]})
  }

  handleFileUpload() {
    const data = JSON.stringify({filename: this.state.uploadedFile.name});
    const file = this.state.uploadedFile;

    fetch("http://localhost:3001/api/v1/complaint/generate_upload_url",
      {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((result) => result.json())
      .then(result => {
        return fetch(result.uploadUrl,
          {
            method: "PUT",
            headers: {
              'Content-Type': file.type
            },
            body: file
          }
        );

      });
  }

  render() {
    return (
      <div className={"Complain-form"}>
        <textarea
          className={"complain-text"}
          value={this.state.complaintText}
          onChange={this.handleChange}
          placeholder={"Complain to me!"}
        />
        <div className={"file-upload"}>
          <input type={"file"} onChange={this.handleFileSelected}/>
          <button className={"file-upload-btn button"} onClick={this.handleFileUpload}>Upload</button>
        </div>
        <div className={"submit-line"}>
          <label className={"anonymous-label"}>
            <Toggle
              defaultChecked={this.state.isAnonymous}
              icons={false}/>
            <span>Submit anonymously</span>
          </label>
          <input className={"submit-btn button"} type="submit" value="Submit" onClick={this.handleSubmit}/>
        </div>
      </div>
    );
  }
}

export default ComplainForm;
