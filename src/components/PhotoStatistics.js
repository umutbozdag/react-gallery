import React, { useEffect, useState } from 'react'

export default function PhotoStatistics(props) {

    const [photoStatistics, setPhotoStatistics] = useState({});

    useEffect(() => {
        getPhotoStatistics();
    }, [])


    const getPhotoStatistics = () => {
        fetch(`https://api.unsplash.com/photos/${props.photoId}/statistics?client_id=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setPhotoStatistics(data);
            })
            .catch(err => console.log(err));
    }
    return (
        <div>
            <h1>Photo Statistics</h1>
        </div>
    )
}
