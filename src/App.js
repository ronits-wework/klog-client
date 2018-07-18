import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from "./Main";
import Dashboard from "./Dashboard";

export default function Layout () {
  return (
    <div>
      <BrowserRouter>
        <div className="app-container">
          <Route exact path='/' component={Main}/>
          <Route exact path='/dashboard' component={Dashboard}/>
        </div>
      </BrowserRouter>
    </div>
  );
}
