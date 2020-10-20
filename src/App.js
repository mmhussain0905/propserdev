import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Switch>
            <Route exact path='/' component={HomePage} /> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
