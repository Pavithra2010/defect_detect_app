import React, { useState } from "react";
import Camera from "./components/Camera";
import ImageList from "./components/ImageList";

function App() {
  const [capturedImages, setCapturedImages] = useState([]);
  const [isCameraActive, setIsCameraActive] = useState(true);

  const handleCapture = (imageDataUrl) => {
    setCapturedImages((prev) => [...prev, imageDataUrl]);
  };

  const handleCameraStop = () => {
    setIsCameraActive(false);
  };

  return (
    <div className="App">
      <h1>Image Capture App</h1>
      {isCameraActive ? (
        <Camera onCapture={handleCapture} onStop={handleCameraStop} />
      ) : (
        <p>Camera is stopped. Refresh the page to restart.</p>
      )}
      <ImageList images={capturedImages} />
    </div>
  );
}

export default App;
