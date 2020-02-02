import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import convertDate from '../../helpers/convertDate';
import Spinner from '../Spinner/Spinner';
import Search from '../SearchBar/SearchBar';
import { Avatar, Icon, Tag } from 'antd';
import ModalImage from 'react-modal-image';
import Masonry from 'react-masonry-component';
import { masonryOptions } from '../../helpers/masonryOptions';
import './Collections.css';

class Collections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collections: [],
            start: 1,
            count: 30,
            hasMore: null,
            hasQuery: false,
            searchResult: [],
            userInput: ''
        }
    }

    componentDidMount() {
        this.getCollections();
    }

    getCollections = () => {
        const { count, start, userInput, searchResult, collections, hasQuery } = this.state;

        if (hasQuery) {
            this.setState({ start: start + 1 });
            const url = `https://api.unsplash.com/search/collections?per_page=${count}&page=${start}&query=${userInput}&client_id=${process.env.REACT_APP_API_KEY}`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.setState({ searchResult: data.results, hasQuery: true });
                    console.log("query:" + userInput);
                    console.log(url);
                    console.log(data);
                    console.log(searchResult);
                })
                .catch(err => console.log(err));
        } else {
            this.setState({ start: start + 1 });

            fetch(`https://api.unsplash.com/collections?per_page=${count}&page=${start}&client_id=${process.env.REACT_APP_API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    // this.setState({ collections: data });
                    console.log(collections);
                    this.setState({ collections: collections.concat(data) });
                    if (data.length == 0) {
                        this.setState({ hasMore: false });
                    }
                    console.log(data);
                });
        }

    }

    displayCollections = () => {
        const { collections, hasQuery, searchResult } = this.state;

        if (hasQuery) {
            return (
                <div>
                    <InfiniteScroll
                        dataLength={searchResult.length}
                        next={this.getCollections}
                        hasMore={true}
                        endMessage={<p style={{ textAlign: 'center' }}>
                            <b>There is no more collections!</b>
                        </p>}
                    >
                        <div className="collections">
                            {searchResult.map(collection => (
                                <div key={collection.id} className="collection-card">
                                    <div className="previews">
                                        <Link to={`/collections/${collection.id}`}>
                                            <div className="preview">
                                                {collection.preview_photos.map(previewPhoto => (
                                                    <img
                                                        key={previewPhoto.id}
                                                        src={previewPhoto.urls.thumb}
                                                        alt="" />
                                                ))}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            )
        } else {
            return (

                <div>
                    <InfiniteScroll
                        dataLength={collections.length}
                        next={this.getCollections}
                        hasMore={true}
                        endMessage={<p style={{ textAlign: 'center' }}>
                            <b>There is no more photo!</b>
                        </p>}>


                        <div className="collections">
                            {collections.map(collection => (
                                <div key={collection.id} className="collection-card">
                                    <div className="previews">
                                        <Link to={`/collections/${collection.id}`}>
                                            <div className="preview">
                                                {collection.preview_photos.map(previewPhoto => (
                                                    <img
                                                        key={previewPhoto.id}
                                                        src={previewPhoto.urls.thumb}
                                                        alt="" />
                                                ))}

                                                {collection.tags.map((tag, i) => (
                                                    <Tag key={i}>{tag.title}</Tag>
                                                ))}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </InfiniteScroll>


                    {/* <InfiniteScroll
                        dataLength={searchResult.length}
                        next={this.getCollections}
                        hasMore={true}
                        endMessage={<p style={{ textAlign: 'center' }}>
                            <b>There is no more collections!</b>
                        </p>}
                    >
                        <div className="collections">
                            {searchResult.map(collection => (
                                <div key={collection.id} className="collection-card">
                                    <div className="previews">
                                        <Link to={`/collections/${collection.id}`}>
                                            <div className="preview">
                                                {collection.preview_photos.map(previewPhoto => (
                                                    <img
                                                        key={previewPhoto.id}
                                                        src={previewPhoto.urls.thumb}
                                                        alt="" />
                                                ))}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>  */}
                </div>
            )
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        // In every submit i want it to start query from page 1
        this.setState({ start: 1 });

        const { count, start, userInput, searchResult } = this.state;
        const url = `https://api.unsplash.com/search/collections?per_page=${count}&page=${start}&query=${userInput}&order_by=latest&client_id=${process.env.REACT_APP_API_KEY}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ searchResult: data.results, hasQuery: true });
                console.log("query:" + userInput);
                console.log(url);
                console.log(data);
                console.log(searchResult);
            })
            .catch(err => console.log(err));
    }


    onChangeHandler = (e) => {
        console.log(e.target.value);
        this.setState({ userInput: e.target.value });
    }

    render() {
        return (
            <div>
                <Search placeholder="Search collections..." onChangeHandler={this.onChangeHandler} onSubmitHandler={this.onSubmitHandler}></Search>
                {this.state.collections.length != 0 ? this.displayCollections() : <Spinner />}
            </div>
        )
    }
}


export default Collections;
