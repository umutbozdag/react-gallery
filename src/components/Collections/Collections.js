import React, { Component } from "react";
import Spinner from "../Spinner/Spinner";
import Search from "../SearchBar/SearchBar";
import "./Collections.css";
import Collection from "../Collection/Collection";

class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      start: 1,
      count: 30,
      hasMore: null,
      hasQuery: false,
      searchResult: [],
      userInput: ""
    };
  }

  componentDidMount() {
    this.getCollections();
  }

  getCollections = () => {
    const {
      count,
      start,
      userInput,
      searchResult,
      collections,
      hasQuery
    } = this.state;

    if (hasQuery) {
      this.setState({ start: start + 1 });
      const url = `https://api.unsplash.com/search/collections?per_page=${count}&page=${start}&query=${userInput}&client_id=${process.env.REACT_APP_API_KEY}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.setState({ searchResult: data.results, hasQuery: true });
        
        })
        .catch(err => console.log(err));
    } else {
      this.setState({ start: start + 1 });

      fetch(
        `https://api.unsplash.com/collections?per_page=${count}&page=${start}&client_id=${process.env.REACT_APP_API_KEY}`
      )
        .then(res => res.json())
        .then(data => {
          this.setState({ collections: collections.concat(data) });
        });
    }
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.setState({ start: 1 });

    const { count, start, userInput, searchResult } = this.state;
    const url = `https://api.unsplash.com/search/collections?per_page=${count}&page=${start}&query=${userInput}&order_by=latest&client_id=${process.env.REACT_APP_API_KEY}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ searchResult: data.results, hasQuery: true });
      })
      .catch(err => console.log(err));
  };

  onChangeHandler = e => {
    this.setState({ userInput: e.target.value });
  };

  render() {
    const { collections, hasQuery, searchResult } = this.state;
    return (
      <div>
        <h1 className="collections-title">Collections</h1>
        <Search
          placeholder="Search collections..."
          onChangeHandler={this.onChangeHandler}
          onSubmitHandler={this.onSubmitHandler}
        />

        {collections.length !== 0 ? (
          <Collection
            searchResult={searchResult}
            getCollections={this.getCollections}
            collections={hasQuery ? searchResult : collections}
            collectionsLength={collections.length}
          />
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default Collections;
