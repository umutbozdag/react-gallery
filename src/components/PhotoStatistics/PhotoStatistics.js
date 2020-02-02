import React, { useEffect, useState, Component } from 'react'
import PropTypes from 'prop-types';

export default class PhotoStatistics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            photoStatistics: {}
        }
    }

    componentDidMount() {
        this.getPhotoStatistics();
    }

    getPhotoStatistics = () => {
        const { photoId } = this.props;

        fetch(`https://api.unsplash.com/photos/${photoId}/statistics?client_id=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ data });
                console.log(data);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h1>Photo Statistics</h1>
            </div>
        )
    }
}


PhotoStatistics.propTypes = {
    photoId: PropTypes.number
}
