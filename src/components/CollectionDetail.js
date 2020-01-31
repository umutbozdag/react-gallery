import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import convertDate from '../utils/convertDate';
import LazyLoadImage from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from './Spinner';

export default class CollectionDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            collectionDetail: [],
            collectionId: this.props.match.params.collectionId,
            start: 1,
            count: 30,
            hasMore: null
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
                this.setState({ collectionDetail: this.state.collectionDetail.concat(data) });
                console.log(this.state.collections);

                console.log(data);
                // console.log(url);
                // if (data.length == 0) {
                //     this.setState({ hasMore: false });
                // }
                // console.log(this.state.collectionDetail);
            });
    }

    displayCollectionDetail = () => {
        const { collectionDetail } = this.state;
        return (
            <InfiniteScroll
                dataLength={collectionDetail.length}
                next={this.getCollectionDetail}
                hasMore={true}
                loader={<Spinner />}
                endMessage={<p style={{ textAlign: 'center' }}>
                    <b>There is no more photo!</b>
                </p>}
            >
                <div className="cards">

                    {collectionDetail.map((collection, i) => (
                        <div key={collection.id} className="photo-card">
                            <Link to={`/photos/${collection.id}`}>
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
                {this.state.collectionId.length != 0 ? this.displayCollectionDetail() : <Spinner />}
            </div >
        )
    }
}
