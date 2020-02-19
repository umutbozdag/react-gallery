import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, Icon } from "antd";
import Masonry from "react-masonry-component";
import ModalImage from "react-modal-image";
import { Link } from "react-router-dom";
import { masonryOptions } from "../../helpers/masonryOptions";
import Spinner from "../Spinner/Spinner";
import NoContent from "../NoContent/NoContent";

export default function UserLikes(props) {
  return (
    <div>
      <div>
        {props.userLikes.length != 0 ? (
          <div className="container">
            <InfiniteScroll
              dataLength={props.userLikes.length}
              next={props.getUserLikes}
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
                {props.userLikes.map((photo, i) => (
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
          <NoContent />
        )}
      </div>
    </div>
  );
}
