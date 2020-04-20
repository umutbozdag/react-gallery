import React from "react";
import Photos from "../components/Photos/Photos";

export default function Home() {
  return (
    <div>
      <div className="Home">
        <h1>Explore the world.</h1>
      </div>

      <div className="Photos">
        <Photos></Photos>
      </div>
    </div>
  );
}
