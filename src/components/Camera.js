import React, { useRef, useEffect, useState } from "react";

const Camera = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    startCamera();
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      stopCamera();
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const imageDataUrl = canvas.toDataURL("image/jpeg");
    onCapture(imageDataUrl);
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "c" || event.key === "C") {
      captureImage();
    } else if (event.key === "q" || event.key === "Q") {
      stopCamera();
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <p>Press 'C' to capture an image, 'Q' to stop the camera</p>
    </div>
  );
};

export default Camera;
