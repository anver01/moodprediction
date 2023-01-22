import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

import { config } from "./aws-exports";

import AWS from "aws-sdk";
import axios from "axios";
import { motion } from "framer-motion";
// import { useMediaQuery } from "./hooks/useMediaQuery";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: config.bucketName },
  region: config.region,
});

function App() {
  const ref = useRef();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mobileModal, setMobileModal] = useState(false);
  // const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSuccess = useCallback(async () => {
    setLoading(true);
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL, {
      bucket: config.bucketName,
      file: file.name,
    });
    setImage({ image: response.data.img_url, result: response.data.result });
    setLoading(false);
  }, [file]);

  useEffect(() => {
    if (file) {
      const params = {
        Body: file,
        Bucket: config.bucketName,
        Key: file.name,
      };

      myBucket
        .putObject(params)
        .on("success", async (evt) => {
          await handleSuccess();
        })
        .send((err) => {
          if (err) console.error(err);
        });
    }
  }, [file, handleSuccess]);

  return (
    <>
      <div className="h-screen bg-[#F6F5FF] w-full overflow-x-hidden relative z-10">
        <motion.div
          className="absolute top-2 left-0 right-0 w-full md:block hidden"
          animate={{ x: "100%" }}
          initial={{ x: "0%" }}
          transition={{
            repeat: "Infinity",
            duration: 10,
            ease: "linear",
          }}
        >
          <div className="text-[#7A70DD] font-cinzel font-medium text-6xl drop-shadow-md mr-2">
            HAPPY&nbsp;SUPRISE&nbsp;SAD&nbsp;DISGUSTED&nbsp;ANGRY&nbsp;NEUTRAL
          </div>
        </motion.div>
        <motion.div
          className="absolute top-2 left-0 right-0 w-full md:block hidden"
          animate={{ x: "0%" }}
          initial={{ x: "-100%" }}
          transition={{
            repeat: "Infinity",
            duration: 10,
            ease: "linear",
            // delay: 8,
          }}
        >
          <div className="text-[#7A70DD] font-cinzel font-medium text-6xl drop-shadow-md mr-2">
            HAPPY&nbsp;SUPRISE&nbsp;SAD&nbsp;DISGUSTED&nbsp;ANGRY&nbsp;NEUTRAL
          </div>
        </motion.div>
        <div className="relative top-20 md:top-52 grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 mx-8 md:mx-16">
          <div className="flex flex-col">
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-8xl font-bold">
                <span className="text-[#FFAEBC] drop-shadow-sm">Mood</span>
                <br />
                <span className="text-[#FFAEBC] drop-shadow-sm">Predictor</span>
              </h1>
            </div>
            <div className="mx-auto md:mx-20 my-6">
              <input
                hidden
                type="file"
                accept="image/*"
                ref={ref}
                onChange={handleUpload}
              />
              <button
                className="block md:hidden px-4 py-2 rounded bg-[#7A70DD] text-white font-medium flex items-center justify-center shadow-md my-2"
                style={{ minWidth: "200px" }}
                onClick={() => setMobileModal(true)}
              >
                More Info
              </button>
              <button
                disabled={loading}
                className="px-4 py-2 rounded bg-[#7A70DD] text-white font-medium flex items-center justify-center shadow-md"
                style={{ minWidth: "200px" }}
                onClick={() => ref.current.click()}
              >
                {loading ? (
                  <img
                    className="animate-spin h-6 w-6"
                    src="spinner.svg"
                    alt="Loading"
                  />
                ) : (
                  "Upload"
                )}
              </button>
              {file && (
                <span className="font-medium opacity-60">
                  Uploaded! - {file.name}
                </span>
              )}
              {/* <a
              className="text-blue-600 text-center mx-10 my-12"
              href="#"
              target="_blank"
            >
              Link to Github
            </a> */}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-black opacity-60 hidden md:block">
              <p>
                This app is a facial expression predictor that is built on top
                of a CNN, built using Tensorflow, which is trained using images
                of facial expressions. To increase accuracy various image
                augmentation such as horizontal and vertical flip, rotation,
                etc. were used. The model achieved a validation accuracy of 78%
                in 30 epochs.
              </p>
              <p>
                The backend is deployed as a serverless function using AWS
                Lambda. The frontend has been created using React and hosted on
                AWS Amplify
              </p>
              <br />
              <p>
                * This app does not store any data. All the images are deleted
                after being process through the neural network for prediction
              </p>
            </div>
            {image ? (
              <div className="mt-10 flex flex-col items-center">
                <img className="h-32" src={image.image} alt="User" />
                <span>{image.result}</span>
              </div>
            ) : (
              <motion.div
                className="relative w-full mx-auto my-8 md:m-auto"
                // animate={{ opacity: 1 }}
                // initial={{ opacity: 0 }}
                // transition={{
                //   when: "beforeChildren",
                //   delayChildren: 0.3,
                //   staggerChildren: 0.3,
                // }}
              >
                <motion.div
                  className="bg-white rounded-md p-4 shadow-md flex flex-col items-center absolute left-1/2"
                  animate={{
                    opacity: 1,
                    translateX: -176,
                    translateY: 24,
                    rotate: "-6deg",
                  }}
                  initial={{
                    translateX: 0,
                    translateY: 0,
                    opacity: 0,
                    rotate: 0,
                  }}
                  whileHover={{ translateY: 1 }}
                >
                  <img
                    className="w-24 h-24"
                    src="./images/angry.png"
                    alt="angry_memoji"
                  />
                  <h1 className="text-black opacity-60">Angry</h1>
                </motion.div>
                <motion.div
                  className="bg-white rounded-md p-4 shadow-md flex flex-col items-center absolute left-1/2"
                  animate={{
                    opacity: 1,
                    rotate: "6deg",
                    translateX: 48,
                    translateY: 24,
                  }}
                  initial={{
                    translateX: 0,
                    translateY: 0,
                    opacity: 0,
                    rotate: 0,
                  }}
                  whileHover={{ translateY: 1 }}
                >
                  <img
                    className="w-24 h-24"
                    src="./images/sad.png"
                    alt="sad_memoji"
                  />
                  <h1 className="text-black opacity-60">Sad</h1>
                </motion.div>
                <motion.div
                  className="bg-white rounded-md p-4 shadow-lg drop-shadow-lg flex flex-col items-center absolute left-1/2"
                  // variants={{
                  //   mobile: {
                  //     opacity: 1,
                  //     translateX: "-50%",
                  //     translateY: -20,
                  //   },
                  //   desktop: {
                  //     opacity: 1,
                  //     translateX: "-50%",
                  //   },
                  // }}
                  animate={{
                    opacity: 1,
                    translateX: "-50%",
                  }}
                  initial={{
                    translateX: 0,
                    opacity: 0,
                  }}
                  whileHover={{ translateY: -20 }}
                >
                  <img
                    className="w-24 h-24"
                    src="./images/happy.png"
                    alt="happy_memoji"
                  />
                  <h1 className="text-black">Happy</h1>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
        <div className="w-full absolute bottom-0 left-0 bg-[#1D1D1D] h-16">
          <h1 className="text-center my-4 flex items-center justify-center">
            <a
              className="mx-2 opacity-60"
              href="https://github.com/anver01"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-6 h-6 inline"
                src="./images/github-mark.png"
                alt="Github Logo"
              />
            </a>
            <span className="text-white opacity-40 mt-1">
              Made by Anshit Verma with&nbsp;
            </span>
            <span className="opacity-100 mt-1">❤️</span>
          </h1>
        </div>
        {/* <motion.div
        className="absolute bottom-2 right-0 left-0"
        animate={{ x: "-100%" }}
        initial={{ x: "100%" }}
        transition={{
          repeat: "Infinity",
          duration: 5,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        <div className="text-[#7A70DD] font-cinzel font-medium text-6xl drop-shadow-md">
          HAPPY&nbsp;SUPRISE&nbsp;SAD&nbsp;DISGUSTED
        </div>
      </motion.div> */}
        {/* <motion.div
        className="absolute bottom-0"
        animate={{ x: "-100%" }}
        initial={{ x: "100%" }}
        transition={{
          repeat: "Infinity",
          duration: 16,
          ease: "linear",
          repeatType: "loop",
          delay: 8,
        }}
      >
        <div className="text-[#7A70DD] font-cinzel font-medium text-6xl mx-1 drop-shadow-md">
          HAPPY&nbsp;SUPRISE&nbsp;SAD&nbsp;DISGUSTED
        </div>
      </motion.div> */}
      </div>
      {mobileModal && (
        <div
          className="absolute w-full h-screen z-40 bg-black opacity-40 inset-0"
          onClick={() => setMobileModal(false)}
        ></div>
      )}
      {mobileModal && (
        <div className="absolute z-50 bg-white text-black text-opacity-60 inset-0 w-4/5 m-auto h-3/4 pt-5 p-4 rounded-md overflow-scroll">
          <img
            className="w-4 h-4 absolute top-3 right-4 opacity-60"
            src="./images/cancel.svg"
            alt="Cancel"
            onClick={() => setMobileModal(false)}
          />
          <p>
            This app is a facial expression predictor that is built on top of a
            CNN, built using Tensorflow, which is trained using images of facial
            expressions. To increase accuracy various image augmentation such as
            horizontal and vertical flip, rotation, etc. were used. The model
            achieved a validation accuracy of 78% in 30 epochs.
          </p>
          <p>
            The backend is deployed as a serverless function using AWS Lambda.
            The frontend has been created using React and hosted on AWS Amplify
          </p>
          <br />
          <p>
            * This app does not store any data. All the images are deleted after
            being process through the neural network for prediction
          </p>
        </div>
      )}
    </>
  );
}

export default App;
