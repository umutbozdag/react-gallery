import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import convertDate from '../../utils/convertDate';
import Spinner from '../Spinner/Spinner';
import Image from 'react-graceful-image';
import './CollectionDetail.css';


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
        const { count, start, collectionId, collectionDetail } = this.state;
        this.setState({ start: this.state.start + 1 });
        const url = `https://api.unsplash.com/collections/${collectionId}/photos?per_page=${count}&page=${start}&client_id=${process.env.REACT_APP_API_KEY}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ collectionDetail: collectionDetail.concat(data) });
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
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>There is no more photo!</b>
                    </p>
                }>
                <div className="card-deck">
                    {collectionDetail.map((collection, i) => (
                        <div key={collection.id} className="card">
                            <Link to={`/photos/${collection.id}`}>
                                <Image
                                    placeholderColor={collection.color}
                                    key={i}
                                    className="photo"
                                    placeholderColor={collection.color}
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
        const { collectionDetail } = this.state;
        return (
            <div>
                <h1>Collection detail</h1>
                {collectionDetail.length != 0 ? this.displayCollectionDetail() : <Spinner />}
            </div >
        )
    }
}
