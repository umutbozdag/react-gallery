import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Photos from './components/Photos';
import PhotoDetail from './components/PhotoDetail';
import NotFound from './components/NotFound';
import About from './components/About';
import PhotoStatistics from './components/PhotoStatistics';

function App() {



  return (
    <div className="App">
      <Router>
        <Nav></Nav>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/photos" component={Photos}></Route>
          <Route exact path="/photos/:photoId" component={PhotoDetail}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/" component={NotFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
