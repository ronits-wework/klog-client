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

    this.fileInput = null;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFileCancel = this.handleFileCancel.bind(this);
  }

  handleChange(event) {
    this.setState({complaintText: event.target.value});
  }

  handleSubmit(event) {
    this.handleFileUpload()
      .then(() => {
        const data = JSON.stringify(
          {
            name: '',
            text: this.state.complaintText,
            asset_url: this.state.uploadedFile ? 'https://s3.amazonaws.com/klog-complaint-images/' + this.state.uploadedFile.name : ''
          }
        );

        fetch("https://klog-staging.herokuapp.com/api/v1/complaint",
          {
            method: "POST",
            body: data,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(result => {
            this.setState({
              complaintText: '',
              isAnonymous: true,
              uploadedFile: null
            });
            this.fileInput.value = '';
            alert('Thanks for complaining!');
          }
        );
      });

  }

  handleFileSelected(event) {
    this.setState({uploadedFile: event.target.files[0]})
  }

  handleFileUpload() {
    const state = this.state;
    return new Promise(function (resolve, reject) {
      const file = state.uploadedFile;
      if (file == null) {
        resolve();
      }
      const data = JSON.stringify({filename: state.uploadedFile.name});

      fetch("https://klog-staging.herokuapp.com/api/v1/complaint/generate_upload_url",
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

        })
        .then(result => {
          resolve();
        });
    });

  }

  handleFileCancel() {
    this.fileInput.value = '';
    this.setState({uploadedFile: null});
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
          <input type={"file"} onChange={this.handleFileSelected} ref={ref => this.fileInput = ref}/>
          <span className={"file-upload-x-icon"} onClick={this.handleFileCancel}>X</span>
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
