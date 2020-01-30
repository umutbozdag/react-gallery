import React from 'react'
import Search from './Search';
import Photos from './Photos';

export default function Home() {

    return (
        <div>
            <div className="Home">
                <h1>Home</h1>
            </div>

            <div className="Photos">
                <Photos></Photos>
            </div>
        </div>
    )
}
