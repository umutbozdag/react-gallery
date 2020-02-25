import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { Tag, Spin } from "antd";
import Masonry from "react-masonry-component";
import { masonryOptions } from "../../helpers/masonryOptions";
import NoContent from "../NoContent/NoContent";

export default function Collection(props) {
  return (
    <div className="collections">
      <InfiniteScroll
        dataLength={
          props.hasQuery ? props.searchResult.length : props.collectionsLength
        }
        next={props.getCollections}
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
          {props.collections.map((photo, i) => (
            <div className="collection" key={i}>
              <Link to={`/collections/${photo.id}`}>
                <div className="collection-photo">
                  <img
                    className="collection-photo"
                    src={photo.cover_photo.urls && photo.cover_photo.urls.small}
                    alt=""
                  />
                </div>
              </Link>
              <Link to={`/collections/${photo.id}`}>
                <p className="photo-title">{photo.title}</p>
              </Link>
              <p className="total-photos">{photo.total_photos} Photos</p>
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
  );
}
