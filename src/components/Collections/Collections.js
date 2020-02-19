import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import Search from "../SearchBar/SearchBar";
import { Avatar, Icon, Tag, Spin } from "antd";
import Masonry from "react-masonry-component";
import { masonryOptions } from "../../helpers/masonryOptions";
import "./Collections.css";
import NoContent from "../NoContent/NoContent";

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
          console.log("query:" + userInput);
          console.log(url);
          console.log(data);
          console.log(searchResult);
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
          console.log(data);
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
        console.log("query:" + userInput);
        console.log(url);
        console.log(data);
        console.log(searchResult);
      })
      .catch(err => console.log(err));
  };

  onChangeHandler = e => {
    console.log(e.target.value);
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

        {collections.length != 0 ? (
          hasQuery ? (
            <div className="collections">
              <InfiniteScroll
                dataLength={searchResult.length}
                next={this.getCollections}
                hasMore={true}
                loader={<Spin />}
                endMessage={<NoContent />}
              >
                <Masonry
                  className="gallery"
                  options={masonryOptions}
                  disableImagesLoaded={false}
                  updateOnEachImageLoad={false}
                >
                  {searchResult.map((photo, i) => (
                    <div className="collection" key={i}>
                      <Link to={`/collections/${photo.id}`}>
                        <div className="collection-photo">
                          <img
                            className="collection-photo"
                            src={
                              photo.cover_photo.urls &&
                              photo.cover_photo.urls.small
                            }
                            alt=""
                          />
                        </div>
                      </Link>
                      <Link to={`/collections/${photo.id}`}>
                        <p className="photo-title">{photo.title}</p>
                      </Link>
                      <p className="total-photos">
                        Total Photos: {photo.total_photos}
                      </p>
                      <div className="collection-tags">
                        {photo.tags.map((tag, index) => (
                          <Tag className="tag" key={index}>
                            {tag.title}
                          </Tag>
                        ))}
                      </div>

                      <div className="photo-info">
                        <Link to={`/users/${photo.user.username}`}>
                          <Avatar
                            className="user-avatar"
                            src={photo.user.profile_image.large}
                          />
                          <p className="username">{photo.user.name}</p>
                        </Link>
                      </div>
                    </div>
                  ))}
                </Masonry>
              </InfiniteScroll>
            </div>
          ) : (
            <div className="collections">
              <InfiniteScroll
                dataLength={collections.length}
                next={this.getCollections}
                hasMore={true}
                loader={<Spin />}
                endMessage={<NoContent />}
              >
                <Masonry
                  className="gallery"
                  options={masonryOptions}
                  disableImagesLoaded={false}
                  updateOnEachImageLoad={false}
                >
                  {collections.map((photo, i) => (
                    <div className="collection" key={i}>
                      <Link to={`/collections/${photo.id}`}>
                        <div className="collection-photo">
                          <img
                            className="collection-photo"
                            src={
                              photo.cover_photo.urls &&
                              photo.cover_photo.urls.small
                            }
                            alt=""
                          />
                        </div>
                      </Link>
                      <Link to={`/collections/${photo.id}`}>
                        <p className="photo-title">{photo.title}</p>
                      </Link>
                      <p className="total-photos">
                        {photo.total_photos} Photos
                      </p>
                      {/* <div className="photo-info">
                        <Link to={`/users/${photo.user.username}`}>
                          <Avatar
                            className="user-avatar"
                            src={photo.user.profile_image.large}
                          />
                          <p className="username">{photo.user.name}</p>
                        </Link>
                      </div> */}
                      <div className="collection-tags">
                        {photo.tags.slice(0, 3).map((tag, index) => (
                          <Tag color="#161616" className="tag" key={index}>
                            {tag.title}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  ))}
                </Masonry>
              </InfiniteScroll>
            </div>
          )
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default Collections;
