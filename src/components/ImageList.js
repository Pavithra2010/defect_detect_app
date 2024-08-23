import React from "react";

const ImageList = ({ images }) => {
  return (
    <div>
      <h2>Captured Images</h2>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Captured ${index}`}
          style={{ width: "200px", margin: "10px" }}
        />
      ))}
    </div>
  );
};

export default ImageList;
