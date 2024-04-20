import {useRef, useState, useCallback} from 'react';
import Webcam from "react-webcam";
import Overlay from '../components/Overlay';

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
        {imgSrc ? (
            <div style={{ height: "100vh", width: "100%" }}>
              <img src={imgSrc} alt="webcam" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <Overlay style={{position: "fixed"}} description={"KSDFJLDK"} retake={retake} />
            </div>
        ) : (
          <div style={{ height: "95vh", width: "100%" }}>
            <Webcam style={{ width: "100%", height: "100%", objectFit: "cover" }} ref={webcamRef} screenshotFormat="image/jpeg"/>
          </div>
        )}
      <div className="btn-container">
        {imgSrc ? (
          <></>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
      </div>
    </div>
  );
};

export default Scanner;
