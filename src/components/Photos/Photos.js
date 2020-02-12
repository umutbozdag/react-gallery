import React, { Component } from 'react'
import Search from '../SearchBar/SearchBar';
import './Photos.css';
import Options from '../Options/Options';
import { Avatar, Icon } from 'antd';
import PropTypes from 'prop-types';
import Photo from '../Photo/Photo';

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
        this.getPhotos();
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

    getPhotos = () => {
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
                <Photo
                    searchResult={searchResult}
                    hasQuery={hasQuery}
                    photos={photos}
                    getPhotos={this.getPhotos}
                    displayName={this.constructor.name}
                />

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