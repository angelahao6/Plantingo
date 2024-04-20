import {useRef, useState, useCallback} from 'react';
import Webcam from "react-webcam";

const Scanner = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log(imageSrc)
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container">
      <div style={{ height: "95vh", width: "100%" }}>
        {imgSrc ? (
            <img src={imgSrc} alt="webcam" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          
            <Webcam style={{ width: "100%", height: "100%", objectFit: "cover" }} ref={webcamRef} screenshotFormat="image/jpeg"/>
        )}
      </div>
      <div className="btn-container">
        {imgSrc ? (
          <button onClick={retake}>Retake photo</button>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
      </div>
    </div>
  );
};

export default Scanner;
