import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import { config } from "./aws-exports";

import AWS from "aws-sdk";
import axios from "axios";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
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

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSuccess = async () => {
    setLoading(true);
    const response = await axios.post(process.env.BACKEND_URL, {
      bucket: config.bucketName,
      file: file.name,
    });
    setImage({ image: response.data.img_url, result: response.data.result });
    setLoading(false);
  };

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
  }, [file]);

  return (
    <div className="h-screen bg-blue-200 text-red-800 text-center">
      <div className="relative top-40 flex flex-col items-center justify-center gap-y-10">
        <h1 className="text-5xl font-bold">Mood Predictor</h1>
        <input
          hidden
          type="file"
          accept="image/*"
          ref={ref}
          onChange={handleUpload}
        />
        <button
          disabled={loading}
          className="px-4 py-2 rounded bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium flex items-center justify-center"
          style={{ minWidth: "200px" }}
          onClick={() => ref.current.click()}
        >
          {loading ? (
            <img
              className="animate-spin h-8 w-8"
              src="spinner.svg"
              alt="Loading"
            />
          ) : (
            "Upload"
          )}
        </button>
        {file && <span className="font-medium">Uploaded! - {file.name}</span>}
        {image && (
          <div className="mt-10 flex flex-col items-center">
            <img className="h-32" src={image.image} alt="User" />
            <span>{image.result}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
