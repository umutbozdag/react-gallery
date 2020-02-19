import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { Spin, Tag } from "antd";
import Masonry from "react-masonry-component";
import { masonryOptions } from "../../helpers/masonryOptions";
import NoContent from "../NoContent/NoContent";

export default function UserCollections(props) {
  return (
    <div>
      {props.userCollections.cover_photo ? (
        <div>
          {props.userCollections.length != 0 ? (
            <div className="collections">
              <InfiniteScroll
                dataLength={props.userCollections.length}
                next={props.getUserCollections}
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
                  {props.userCollections.map((photo, i) => (
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
          ) : (
            <NoContent />
          )}
          &nbsp;
        </div>
      ) : (
        <NoContent />
      )}
    </div>
  );
}
