import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './Main.css';
import ComplainForm from "./ComplainForm";
import grumpy from "./images/grumpy-bulldog-john-daniels.jpg"

class Main extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={grumpy} className={"grumpy"}/>
          <h1 className="App-title">What's bothering you?</h1>
        </header>
        <div className={"App-body"}>
          <ComplainForm/>
        </div>
      </div>
    );
  }
}

export default Main;
