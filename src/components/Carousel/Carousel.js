import React from 'react'

export default function Carousel(props) {
    return (
        <div>
            {console.log(props.randomPhotos)}
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={props.urls && props.urls.regular} className="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src={props.urls && props.urls.regular} className="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src={props.urls && props.urls.regular} class="d-block w-100" alt="..." />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}
