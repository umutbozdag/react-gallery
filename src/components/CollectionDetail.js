import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import convertDate from '../utils/convertDate';
import LazyLoadImage from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default class CollectionDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            collectionDetail: [],
            collectionId: this.props.match.params.collectionId,
            start: 1,
            count: 30
        }
    }

    componentDidMount() {
        this.getCollectionDetail();
    }

    getCollectionDetail = () => {
        const { count, start, collectionId } = this.state;
        this.setState({ start: this.state.start + 1 });
        const url = `https://api.unsplash.com/collections/${collectionId}/photos?per_page=${count}&page=${start}&client_id=${process.env.REACT_APP_API_KEY}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ collectionDetail: data });
                console.log(this.state.collections);

                console.log(data);
                console.log(url);
            });
    }

    displayCollectionDetail = () => {
        console.log(this.state.collectionDetail);
        return (
            <InfiniteScroll
                dataLength={this.state.collectionDetail.length}
                next={this.getCollectionDetail}
                hasMore={true}
                loader={<div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>}
                endMessage={<p style={{ textAlign: 'center' }}>
                    <b>There is no more photo!</b>
                </p>}
            >
                <div className="cards">

                    {this.state.collectionDetail.map((collection, i) => (
                        <div key={collection.id} className="photo-card">
                            <Link to={`/photos/${collection.id}/photos`}>
                                <img
                                    effect="blur"
                                    key={i}
                                    className="photo"
                                    src={collection.urls && collection.urls.small}
                                    alt={collection.alt_description} />
                            </Link>
                            <div className="photo-content">
                                <p>{convertDate(collection.created_at)}</p>
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
                <h1>Collection detail</h1>
                {this.state.collectionId.length != 0 ? this.displayCollectionDetail() : <h1>asdasda</h1>}
            </div >
        )
    }
}
