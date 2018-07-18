import React, {Component} from 'react';
import './ComplainForm.css';
import Toggle from 'react-toggle';
import './react-toggle.css'

class ComplainForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isAnonymous: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form className={"Complain-form"} onSubmit={this.handleSubmit}>
        <textarea
          className={"complain-text"}
          value={this.state.value}
          onChange={this.handleChange}
          placeholder={"Complain to me!"}
        />
        <div className={"submit-line"}>
          <label className={"anonymous-label"}>
            <Toggle
              defaultChecked={this.state.isAnonymous}
              icons={false} />
            <span>Submit anonymously</span>
          </label>
          <input className={"submit-btn"} type="submit" value="Submit"/>
        </div>
      </form>
    );
  }
}

export default ComplainForm;
