import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Icon } from 'antd';
import Masonry from 'react-masonry-component';
import ModalImage from "react-modal-image";
import { Link } from 'react-router-dom';
import { masonryOptions } from '../helpers/masonryOptions';

export default function Photo(props) {
    return (
        <div>
            {props.hasQuery ?
                (<div>
                    {/* <h1>Showing photos for search term:{userInput}</h1> */}
                    <InfiniteScroll
                        dataLength={props.searchResult.length}
                        next={props.getPhotos}
                        hasMore={true}
                        endMessage={<p style={{ textAlign: 'center' }}>
                            <b>There is no more photo!</b>
                        </p>}>

                        <Masonry
                            className='gallery'
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
                                    <a href={photo.links.download}>
                                        <Icon className="icon-download" type="download" />
                                    </a>

                                    <div className="photo-info">
                                        <Link to={`/users/${photo.user.username}`}>
                                            <Avatar className="user-avatar" src={photo.user.profile_image.large} />
                                            <p className="username">{photo.user.name}</p>
                                        </Link>

                                        <Link to={`/photos/${photo.id}`}>
                                            <Icon className="icon-circle" type="info-circle" />                                            </Link>
                                    </div>
                                </div>
                            ))}
                        </Masonry>
                    </InfiniteScroll>

                </div>) : (<div className="container">

                    <InfiniteScroll
                        dataLength={props.photos.length}
                        next={props.getPhotos}
                        hasMore={true}
                        endMessage={<p style={{ textAlign: 'center' }}>
                            <b>There is no more photo!</b>
                        </p>}>
                        <h1 className="title">Photos</h1>

                        <Masonry
                            className='gallery'
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
                                    <a href={photo.links.download}>
                                        <Icon className="icon-download" type="download" />

                                    </a>

                                    <div className="photo-info">
                                        <Link to={`/users/${photo.user.username}`}>
                                            <Avatar className="user-avatar" src={photo.user.profile_image.large} />
                                            <p className="username">{photo.user.name}</p>
                                        </Link>

                                        <Link to={`/photos/${photo.id}`}>
                                            <Icon className="icon-circle" type="info-circle" />                                            </Link>
                                    </div>
                                </div>
                            ))}
                        </Masonry>

                    </InfiniteScroll>
                </div>)}
        </div>
    )
}
