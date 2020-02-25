import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import "./CollectionDetail.css";
import { Avatar, Icon } from "antd";
import Masonry from "react-masonry-component";
import { masonryOptions } from "../../helpers/masonryOptions";
import PropTypes from "prop-types";
import ModalImage from "react-modal-image";

export default class CollectionDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collectionDetail: [],
      collectionId: this.props.match.params.collectionId,
      start: 1,
      count: 30,
      hasMore: null
    };
  }

  componentDidMount() {
    this.getCollectionDetail();
  }

  getCollectionDetail = () => {
    const { count, start, collectionId, collectionDetail } = this.state;
    this.setState({ start: start + 1 });
    const url = `https://api.unsplash.com/collections/${collectionId}/photos?per_page=${count}&page=${start}&client_id=${process.env.REACT_APP_API_KEY}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ collectionDetail: collectionDetail.concat(data) });

        console.log(data);
      });
  };

  render() {
    const { collectionDetail } = this.state;
    return (
      <div>
        <h1>CollectionDetail</h1>

        <InfiniteScroll
          dataLength={collectionDetail.length}
          next={this.getCollectionDetail}
          hasMore={true}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>There is no more photo!</b>
            </p>
          }
        >
          <Masonry
            className="gallery"
            options={masonryOptions}
            disableImagesLoaded={false}
            updateOnEachImageLoad={false}
          >
            {collectionDetail.map((photo, i) => (
              <div key={i}>
                <ModalImage
                  small={photo.urls && photo.urls.small}
                  large={photo.urls && photo.urls.full}
                  alt={photo.alt_description}
                  className="photo-modal"
                  showRotate
                />
                <a href={photo.links.download}>
                  <Icon className="icon-download" type="download" />
                </a>

                <div className="photo-info">
                  <Link to={`/users/${photo.user.username}`}>
                    <Avatar
                      className="user-avatar"
                      src={photo.user.profile_image.large}
                    />
                    <p className="username">{photo.user.name}</p>
                  </Link>

                  <Link to={`/photos/${photo.id}`}>
                    <Icon className="icon-circle" type="info-circle" />{" "}
                  </Link>
                </div>
              </div>
            ))}
          </Masonry>
        </InfiniteScroll>
      </div>
    );
  }
}

CollectionDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      collectionId: PropTypes.string.isRequired
    })
  })
};

CollectionDetail.defaultTypes = {
  collectionId: 0
};
