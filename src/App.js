import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Nav,
  Home,
  Photos,
  PhotoDetail,
  Collections,
  CollectionDetail,
  About,
  NotFound,
  Categories,
  UserProfile,
  User
} from "./components/index";
import { BackTop } from "antd";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/photos" component={Photos}></Route>
          <Route
            path="/photos/:photoId"
            render={props => (
              <PhotoDetail {...props} key={props.match.params.photoId} />
            )}
          />
          <Route exact path="/users" component={UserProfile}>
            {" "}
          </Route>
          <Route exact path="/collections" component={Collections}></Route>
          <Route
            exact
            path="/collections/:collectionId"
            component={CollectionDetail}
          ></Route>
          <Route
            path="/users/:username"
            render={props => (
              <UserProfile {...props} key={props.match.params.username} />
            )}
          />
          <Route path="/about" component={About} />
          <Route path="/" component={NotFound} />
          <Route path="/users"></Route>
        </Switch>
      </Router>
      <BackTop />
    </div>
  );
}

export default App;
