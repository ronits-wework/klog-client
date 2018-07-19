import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from "./Main";
import Dashboard from "./Dashboard";
import Analytics from "./Analytics";

export default function Layout () {
  return (
    <div>
      <BrowserRouter>
        <div className="app-container">
          <Route exact path='/' component={Main}/>
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route exact path='/analytics' component={Analytics}/>
        </div>
      </BrowserRouter>
    </div>
  );
}
