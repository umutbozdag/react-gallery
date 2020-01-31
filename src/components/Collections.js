import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import convertDate from '../utils/convertDate';
import LazyLoadImage from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from './Spinner';


class Collections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collections: [],
            start: 1,
            count: 30,
            hasMore: null
        }
    }

    componentDidMount() {
        this.getCollections();
    }

    getCollections = () => {
        const { count, start, collections } = this.state;
        this.setState({ start: this.state.start + 1 });

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

    displayCollections = () => {
        const { collections } = this.state;
        return (

            <div>
                <InfiniteScroll
                    dataLength={collections.length}
                    next={this.getCollections}
                    hasMore={true}
                    loader={<Spinner />}
                    endMessage={<p style={{ textAlign: 'center' }}>
                        <b>There is no more collections!</b>
                    </p>}
                >
                    <div className="collections">
                        {collections.map(collection => (
                            <div key={collection.id} className="collection-card">
                                <div className="previews">
                                    <Link to={`/collections/${collection.id}/photos`}>
                                        <div className="preview">
                                            {collection.preview_photos.map(previewPhoto => (
                                                <div className="top">
                                                    <img src={previewPhoto.urls.thumb} alt="" />
                                                </div>
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
    }

    render() {
        return (
            <div>
                {this.state.collections.length != 0 ? this.displayCollections() : <Spinner />}
            </div>
        )
    }
}


export default Collections;
