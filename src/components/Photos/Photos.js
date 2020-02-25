import React, { Component } from "react";
import Search from "../SearchBar/SearchBar";
import "./Photos.css";
import Options from "../Options/Options";
import Photo from "../Photo/Photo";

export default class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasQuery: false,
      searchResult: [],
      userInput: "",
      photos: [],
      count: 20,
      start: 1,
      orderBy: "latest",
      randomPhotos: []
    };
  }

  onSubmitHandler = e => {
    e.preventDefault();

    if (this.state.userInput != "") {
      this.setState({ start: 1 });
      const { count, start, userInput, searchResult } = this.state;
      const url = `https://api.unsplash.com/search/photos?per_page=${count}&page=${start}&query=${userInput}&client_id=${process.env.REACT_APP_API_KEY}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.setState({ searchResult: data.results, hasQuery: true });
          console.log(searchResult);
          console.log("query:" + userInput);
          console.log(url);
        })
        .catch(err => console.log(err));
    }
  };

  onChangeHandler = e => {
    console.log(e.target.value);
    this.setState({ userInput: e.target.value });
  };

  handleOptionChange = value => {
    console.log(`selected ${value}`);
    this.setState(
      {
        orderBy: value
      },
      () => {
        this.getPhotos(this.state.orderBy);
      }
    );
  };

  componentDidMount() {
    this.getPhotos();
  }

  getPhotos = orderValue => {
    const {
      count,
      start,
      hasQuery,
      userInput,
      photos,
      searchResult,
      orderBy
    } = this.state;

    this.setState({ start: start + 1 });
    if (hasQuery) {
      console.log("search images");

      const url = `https://api.unsplash.com/search/photos?per_page=${count}&page=${start}&query=${userInput}&order_by=${orderValue}&client_id=${process.env.REACT_APP_API_KEY}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.setState({ searchResult: [...data.results, ...searchResult] });
          console.log(data);
          console.log(url);
        })
        .catch(err => console.log(err));
    } else {
      console.log("default images");

      const url = `https://api.unsplash.com/photos?per_page=${count}&page=${start}&order_by=${orderBy}&client_id=${process.env.REACT_APP_API_KEY}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.setState({ photos: [...data, ...photos] });
          console.log(data);
          console.log(url);
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { photos, searchResult, hasQuery, userInput } = this.state;
    return (
      <div>
        <Search
          marginTop="48px"
          placeholder="Search photos..."
          onChangeHandler={this.onChangeHandler}
          onSubmitHandler={this.onSubmitHandler}
        />

        <div className="photos-container">
          <div className="photos-container-top">
            <h1>Photos</h1>
            <Options handleOptionChange={this.handleOptionChange} />
          </div>
        </div>
        <Photo
          hasQuery={hasQuery}
          photos={hasQuery ? searchResult : photos}
          getPhotos={this.getPhotos}
          photosLength={photos.length}
        />
      </div>
    );
  }
}
