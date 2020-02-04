import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {},
            username: this.props.match.params.username
        }
    }
    componentDidMount() {
        this.getUser();
        this.getUserPhotos();
        this.getUserLikes();
        this.getUserCollections();
    }

    getUser = () => {
        const { username } = this.state;
        const url = `https://api.unsplash.com/users/${username}?client_id=${process.env.REACT_APP_API_KEY}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));
    }

    getUserPhotos = () => {
        const { username } = this.state;
        const url = `https://api.unsplash.com/users/${username}/photos?client_id=${process.env.REACT_APP_API_KEY}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));
    }


    getUserLikes = () => {
        const { username } = this.state;
        const url = `https://api.unsplash.com/users/${username}/likes?client_id=${process.env.REACT_APP_API_KEY}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));
    }
    getUserCollections = () => {
        const { username } = this.state;
        const url = `https://api.unsplash.com/users/${username}/collections?client_id=${process.env.REACT_APP_API_KEY}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
                <h1>User profile!</h1>

            </div>
        )
    }
}

UserProfile.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            username: PropTypes.string.isRequired
        })
    }),
};

UserProfile.defaultTypes = {
    username: ''
};