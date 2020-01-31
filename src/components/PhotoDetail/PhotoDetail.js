import React, { useState, useEffect, Component } from 'react'
import PhotoStatistics from '../PhotoStatistics/PhotoStatistics';

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


    render() {
        const { photo } = this.state;

        return (
            <div>
                <h1>Photo Detail</h1>
                <img src={photo.urls && photo.urls.regular} alt="" />
                <a href={photo.urls && photo.urls.full} target="_blank" download>Download</a>
                <PhotoStatistics photoId={this.state.photoId}></PhotoStatistics>
            </div >
        )

    }

}
