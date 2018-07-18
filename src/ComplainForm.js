import React, {Component} from 'react';
import './ComplainForm.css';
import Toggle from 'react-toggle';
import './react-toggle.css'

class ComplainForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isAnonymous: true,
      uploadedFile: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('We feel your pain!');
    event.preventDefault();
  }

  handleFileSelected(event) {
    this.setState({uploadedFile: event.target.files[0]})
  }

  handleFileUpload() {

  }

  render() {
    return (
      <form className={"Complain-form"}>
        <textarea
          className={"complain-text"}
          value={this.state.value}
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
          <input className={"submit-btn button"} type="submit" value="Submit" onClick={this.handleSubmit} />
        </div>
      </form>
    );
  }
}

export default ComplainForm;
