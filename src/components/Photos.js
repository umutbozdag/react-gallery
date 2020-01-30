import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Search from './Search';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import convertDate from '../utils/convertDate';
import Carousel from './Carousel';


export default class Photos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasQuery: false,
            searchResult: [],
            userInput: '',
            photos: [],
            count: 5,
            start: 1,
            orderBy: 'latest',
            randomPhotos: []
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        // In every submit i want it to start query from page 1
        this.setState({ start: 1 });

        const { count, start } = this.state;
        const url = `https://api.unsplash.com/search/photos?per_page=${count}&page=${start}&query=${this.state.userInput}&order_by=latest&client_id=${process.env.REACT_APP_API_KEY}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ searchResult: data.results, hasQuery: true });
                console.log(this.state.searchResult);
                console.log("query:" + this.state.userInput);
                console.log(url);

            })
            .catch(err => console.log(err));
    }


    onChangeHandler = (e) => {
        console.log(e.target.value);
        this.setState({ userInput: e.target.value });
    }


    componentWillMount() {
        this.fetchPhotos();
        //  this.getRandomPhoto(3);
    }

    getRandomPhoto = (count) => {
        for (let i = 0; i <= count; i++) {
            fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    this.setState({ randomPhotos: data });
                    console.log(this.state.randomPhotos.map(randomPhoto => console.log(randomPhoto)));
                });
        }
    }

    displayCarousel = () => {
        return (
            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="..." class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="..." class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="..." class="d-block w-100" alt="..." />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        )
    }


    fetchPhotos = () => {
        if (this.state.hasQuery) {
            console.log("search images");
            const { count, start } = this.state;
            this.setState({ start: this.state.start + 1 });

            const url = `https://api.unsplash.com/search/photos?per_page=${count}&page=${start}&query=${this.state.userInput}&order_by=${this.state.orderBy}&client_id=${process.env.REACT_APP_API_KEY}`
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.setState({ searchResult: this.state.searchResult.concat(data.results) });
                    console.log(data);
                    console.log(url);
                })
                .catch(err => console.log(err));
        } else {
            console.log("default images");

            const { count, start } = this.state;
            this.setState({ start: this.state.start + 1 });

            const url = `https://api.unsplash.com/photos?per_page=${count}&page=${start}&order_by=${this.state.orderBy}&client_id=${process.env.REACT_APP_API_KEY}`
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.setState({ photos: this.state.photos.concat(data) });
                    console.log(data);
                    console.log(url);
                })
                .catch(err => console.log(err));
        }
    }

    displaySearchResults = () => {

        return (
            <div>
                {this.displayCarousel()}
                <InfiniteScroll
                    dataLength={this.state.searchResult.length}
                    next={this.fetchPhotos}
                    hasMore={true}
                    loader={
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    }
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>There is no more photo!</b>
                        </p>
                    }
                >
                    <div className="cards">
                        {this.state.searchResult.map((photo, i) => (
                            <div class="photo-card" width="18rem">
                                <Link to={`/photos/${photo.id}`}>
                                    <LazyLoadImage effect="blur"
                                        key={i}
                                        className="photo"
                                        src={photo.urls && photo.urls.small}
                                        alt={photo.alt_description} />
                                    <div class="card-content">
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                </Link>


                            </div>
                        ))}
                    </div>

                </InfiniteScroll>
            </div>
        )

    }

    displayPhotos = () => {
        return (

            <InfiniteScroll
                dataLength={this.state.photos.length}
                next={this.fetchPhotos}
                hasMore={true}
                loader={<div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>}
                endMessage={<p style={{ textAlign: 'center' }}>
                    <b>There is no more photo!</b>
                </p>}
            >
                <div className="cards">

                    {this.state.photos.map((photo, i) => (
                        <div key={photo.id} className="photo-card">

                            <Link to={`/photos/${photo.id}`}>
                                <LazyLoadImage
                                    effect="blur"
                                    key={i}
                                    className="photo"
                                    src={photo.urls && photo.urls.small}
                                    alt={photo.alt_description} />
                            </Link>
                            <div className="photo-content">
                                <p>{convertDate(photo.created_at)}</p>
                            </div>
                        </div>

                    ))}
                </div>
            </InfiniteScroll>
        )
    }


    render() {
        return (

            <div>
                <Search
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler} />
                <Carousel randomPhotos={this.state.randomPhotos}></Carousel>
                <h1>Photos</h1>

                {this.state.hasQuery ? this.displaySearchResults() : this.displayPhotos()}


            </div>
        )
    }

}
