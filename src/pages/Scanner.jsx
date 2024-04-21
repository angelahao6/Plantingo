import {useRef, useState, useCallback} from 'react';
import Webcam from "react-webcam";
import Overlay from '../components/Overlay';

const Scanner = ({user}) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    // console.log(imageSrc)
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container">
      <p style={{position: "absolute", top: "5vh", left: "50%", transform: "translateX(-50%)", width: "75vw", fontSize: "20px", color: "white", backdropFilter: "blur(10px)", padding: "10px", borderRadius: "20px"}}>Press any key to take a picture!</p>
        {imgSrc ? (
            <div style={{ height: "100vh", width: "100%" }}>
              <img src={imgSrc} alt="webcam" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <Overlay style={{position: "fixed"}} retake={retake} image={imgSrc} />
            </div>
        ) : (
          <div style={{ height: "95vh", width: "100%" }}>
            <Webcam style={{ width: "100%", height: "100%", objectFit: "cover" }} ref={webcamRef} screenshotFormat="image/jpeg"
              onClick={capture}
            />
          </div>
        )}
      {/* <div className="btn-container">
        {imgSrc ? (
          <></>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
      </div> */}
    </div>
  );
};

export default Scanner;
