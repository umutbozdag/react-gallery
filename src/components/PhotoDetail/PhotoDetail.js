import React, { Component } from 'react'
import PhotoStatistics from '../PhotoStatistics/PhotoStatistics';
import './PhotoDetail.css';
import { Spin, Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import { masonryOptions } from '../../helpers/masonryOptions';
import ModalImage from "react-modal-image";
import PropTypes from 'prop-types';

export default class PhotoDetail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            photo: {},
            photoId: this.props.match.params.photoId,
        }
    }


    componentDidMount() {
        this.getPhoto();
    }

    getPhoto = () => {
        fetch(`https://api.unsplash.com/photos/${this.state.photoId}?client_id=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ photo: data });
                console.log(this.state.photo);
            })
            .catch(err => console.log(err));
    }

    compareParams(prevProps, props) {
        if (!prevProps || typeof prevProps.params !== typeof props.params) {
            return false;
        }
        return Object.is(props.params, prevProps.params);
    }

    render() {
        const { photo } = this.state;

        return (
            <div>
                <div className="photo-detail-container">
                    <div>
                        {photo.urls &&
                            <picture>
                                <source media="(max-width: 1200px)" srcSet={photo.urls.raw + "&w=1000&h=700&fit=crop&fm=jpg"} />
                                <source media="(max-width: 250px)" srcSet={photo.urls.small} />
                                <ModalImage
                                    small={photo.urls && photo.urls.raw + "&w=800&h=700&fit=crop&fm=jpg"}
                                    large={photo.urls && photo.urls.full}
                                    alt={photo.alt_description}
                                    className="photo-modal"
                                    showRotate
                                />
                            </picture>
                        }
                        {photo.user &&
                            <div>
                                <div className="photo-detail-info">
                                    <div className="photo-detail-left">
                                        <Link to={`/users/${photo.user.username}`}>
                                            <div className="photo-detail-user">
                                                <img className="photo-detail-avatar" src={photo.user.profile_image.medium} />
                                                <p className="username">{photo.user.name}</p>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="photo-detail-right">
                                        <Icon type="download" />
                                        <a className="photo-detail-download" href={photo.links && photo.links.download} target="_blank" download>download</a>
                                    </div>
                                </div>
                                <div className="photo-detail-statistics">
                                    <details>
                                        <summary>Statistics</summary>
                                        <PhotoStatistics photoId={this.state.photoId}></PhotoStatistics>
                                    </details>
                                </div>
                                <div className="more">
                                    <div>
                                        <h1>More</h1>
                                        {photo.tags &&
                                            <div className="photo-detail-more">
                                                {
                                                    photo.tags.map(tag => (
                                                        tag.type === 'landing_page' ?
                                                            <div className="photo-detail-more-img" key={tag.id}>
                                                                <ModalImage
                                                                    small={tag.source.cover_photo.urls.small}
                                                                    large={tag.source.cover_photo.urls.full}
                                                                    alt={tag.source.cover_photo.alt_description}
                                                                    className="photo-modal"
                                                                    showRotate
                                                                />
                                                                <a target="_blank" href={tag.source.cover_photo.links.download}>
                                                                    <Icon className="icon-download" type="download" />
                                                                </a>

                                                                <div className="photo-info">
                                                                    <Link to={`/users/${tag.source.cover_photo.user.username}`}>
                                                                        {tag.source.cover_photo.user &&
                                                                            <Avatar className="user-avatar" src={tag.source.cover_photo.user.profile_image.small} />
                                                                        }
                                                                        <p className="username">{tag.source.cover_photo.user.name}</p>
                                                                    </Link>

                                                                    <Link to={`/photos/${tag.source.cover_photo.id}`}>
                                                                        <Icon className="icon-circle" type="info-circle" />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            : ''
                                                    ))
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>

                            </div>
                        }
                    </div>
                </div>

                {/* <div className="tags">
                    {photo.tags &&
                        <div>
                            {photo.}
                        </div>

                    }
                </div> */}
            </div>
        )

    }

}
