import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Search from '../SearchBar/SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import convertDate from '../../helpers/convertDate';
import Carousel from '../ImageSlider/ImageSlider';
import './Photos.css';
import Categories from '../Categories/Categories';
import Options from '../Options/Options';
import { Avatar, Icon } from 'antd';
import Masonry from 'react-masonry-component';
import { masonryOptions } from '../../helpers/masonryOptions';
import ModalImage from "react-modal-image";
import PropTypes from 'prop-types';

export default class Photos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasQuery: false,
            searchResult: [],
            userInput: '',
            photos: [],
            count: 20,
            start: 1,
            orderBy: 'latest',
            randomPhotos: []
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        // In every submit i want it to start query from page 1
        this.setState({ start: 1 });

        const { count, start, userInput, searchResult } = this.state;
        const url = `https://api.unsplash.com/search/photos?per_page=${count}&page=${start}&query=${userInput}&client_id=${process.env.REACT_APP_API_KEY}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ searchResult: data.results, hasQuery: true });
                console.log(searchResult);
                console.log("query:" + userInput);
                console.log(url);
            })
            .catch(err => console.log(err));

    }


    onChangeHandler = (e) => {

        console.log(e.target.value);
        this.setState({ userInput: e.target.value });
    }


    handleOptionChange = (value) => {
        console.log(`selected ${value}`);

        this.fetchPhotos(value);
        // this.displayPhotos();
    }


    componentDidMount() {
        this.fetchPhotos();
        // this.getRandomPhoto(3);
    }

    getRandomPhoto = (count) => {
        const { randomPhotos } = this.state
        for (let i = 0; i <= count; i++) {
            fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    let randomArr = [];
                    // randomPhoto.push(data);

                    // for (randomPhoto in data) {
                    //     randomArr.push();
                    // }

                    this.setState({ randomPhotos: data });
                    console.log(randomPhotos);
                    // console.log(randomPhotos.map(randomPhoto => console.log(randomPhoto)));
                });
        }
    }

    fetchPhotos = () => {
        const {
            count,
            start,
            hasQuery,
            userInput,
            orderBy,
            photos,
            searchResult } = this.state;

        this.setState({ start: start + 1 });

        if (hasQuery) {
            console.log("search images");

            const url = `https://api.unsplash.com/search/photos?per_page=${count}&page=${start}&query=${userInput}&order_by=${orderBy}&client_id=${process.env.REACT_APP_API_KEY}`
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.setState({ searchResult: searchResult.concat(data.results) });
                    console.log(data);
                    console.log(url);
                })
                .catch(err => console.log(err));
        } else {
            console.log("default images");

            const url = `https://api.unsplash.com/photos?per_page=${count}&page=${start}&order_by=${orderBy}&client_id=${process.env.REACT_APP_API_KEY}`
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.setState({ photos: photos.concat(data) });
                    console.log(data);
                    console.log(url);
                })
                .catch(err => console.log(err));
        }
    }

    displayPhotos = () => {



    }


    render() {
        const { photos, searchResult, hasQuery, userInput, randomPhotos } = this.state;

        return (

            <div>

                <Search
                    marginTop="48px"
                    placeholder="Search photos..."
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler} />
                {/* <Carousel randomPhotos={randomPhotos}></Carousel> */}
                <Options handleOptionChange={this.handleOptionChange} />
                {/* <Categories /> */}
                {hasQuery ?
                    (<div>
                        <h1>Showing photos for search term:{userInput}</h1>
                        <InfiniteScroll
                            dataLength={searchResult.length}
                            next={this.fetchPhotos}
                            hasMore={true}
                            endMessage={<p style={{ textAlign: 'center' }}>
                                <b>There is no more photo!</b>
                            </p>}>

                            <Masonry
                                className={'gallery'} // default ''
                                options={masonryOptions} // default {}
                                disableImagesLoaded={false} // default false
                                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                            >
                                {searchResult.map((photo, i) => (

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
                                                <Icon className="icon-eye" type="arrow-right" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </Masonry>

                        </InfiniteScroll>
                    </div>)

                    :

                    (<div className="container">

                        <InfiniteScroll
                            dataLength={photos.length}
                            next={this.fetchPhotos}
                            hasMore={true}
                            endMessage={<p style={{ textAlign: 'center' }}>
                                <b>There is no more photo!</b>
                            </p>}>
                            <h1 className="title">Photos</h1>

                            <Masonry
                                className={'gallery'} // default ''
                                options={masonryOptions} // default {}
                                disableImagesLoaded={false} // default false
                                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                            >
                                {photos.map((photo, i) => (

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
                                                <Icon className="icon-eye" type="arrow-right" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </Masonry>

                        </InfiniteScroll>
                    </div>)}

            </div>
        )
    }

}


Photos.propTypes = {
    username: PropTypes.string,
}

Photos.defaultProps = {
    username: ''
}