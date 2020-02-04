import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Nav, Home, Photos, PhotoDetail, Collections, CollectionDetail, About, NotFound, Categories, UserProfile } from './components/index';
import { BackTop } from 'antd';

function App() {

  return (
    <div className="App">
      <Router>
        <Nav></Nav>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/photos" component={Photos}></Route>
          <Route path="/photos/:photoId" render={(props) => (
            <PhotoDetail
              {...props}
              key={props.match.params.photoId} />
          )} />
          <Route exact path="/collections" component={Collections}></Route>
          <Route path="/collections/:collectionId" component={CollectionDetail}></Route>
          <Route exact path="/users/:username" component={UserProfile}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/" component={NotFound}></Route>
        </Switch>
      </Router>
      <BackTop />
    </div>
  );
}

export default App;
