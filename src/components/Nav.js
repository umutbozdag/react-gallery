import React from 'react'
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <div>

            <nav className="navbar navbar-expand-lg">
                <div className="container">

                    <Link to="/"><a className="navbar-brand" href="#">ReactGallery</a></Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarText">

                        <Link to="/photos">
                            <a className="nav-link" href="#">Photos</a>
                        </Link>

                        <Link to="/about">
                            <a className="nav-link" href="#">About</a>
                        </Link>

                    </div>
                </div>
            </nav>
        </div>
    )
}
