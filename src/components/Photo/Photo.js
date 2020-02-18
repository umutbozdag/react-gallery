import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, Icon } from "antd";
import Masonry from "react-masonry-component";
import ModalImage from "react-modal-image";
import { Link } from "react-router-dom";
import { masonryOptions } from "../../helpers/masonryOptions";
import PropTypes from "prop-types";

export default function Photo(props) {
  return (
    <div>
      {props.hasQuery ? (
        props.searchResult.length != 0 ? (
          <div>
            <InfiniteScroll
              dataLength={props.searchResult.length}
              next={props.getPhotos}
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
                {props.searchResult.map((photo, i) => (
                  <div key={i}>
                    <ModalImage
                      small={photo.urls && photo.urls.small}
                      large={photo.urls && photo.urls.full}
                      alt={photo.alt_description}
                      className="photo-modal"
                      showRotate
                    />
                    <a target="_blank" href={photo.links.download}>
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
                        <Icon className="icon-circle" type="info-circle" />
                      </Link>
                    </div>
                  </div>
                ))}
              </Masonry>
            </InfiniteScroll>
          </div>
        ) : (
          <p className="no-results">No results :(</p>
        )
      ) : (
        <div className="container">
          <InfiniteScroll
            dataLength={props.photos.length}
            next={props.getPhotos}
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
              {props.photos.map((photo, i) => (
                <div key={i}>
                  <ModalImage
                    small={photo.urls && photo.urls.small}
                    large={photo.urls && photo.urls.full}
                    alt={photo.alt_description}
                    className="photo-modal"
                    showRotate
                  />
                  <a target="_blank" href={photo.links.download}>
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
                      <Icon className="icon-circle" type="info-circle" />
                    </Link>
                  </div>
                </div>
              ))}
            </Masonry>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}

Photo.propTypes = {
  username: PropTypes.string
};

Photo.defaultProps = {
  username: ""
};
