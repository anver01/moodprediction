import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import { config } from "./aws-config";

import AWS from "aws-sdk";
import axios from "axios";
import { BACKEND_URL } from "./constants";

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
});

const myBucket = new AWS.S3({
  params: { Bucket: config.bucketName },
  region: config.region,
});

function App() {
  const ref = useRef();
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSuccess = async () => {
    const response = await axios.post(BACKEND_URL, {
      bucket: config.bucketName,
      file: file.name,
    });
    console.log(response.data);
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
          className="px-4 py-2 rounded bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium"
          onClick={() => ref.current.click()}
        >
          Upload
        </button>
        {file && <span className="font-medium">Uploaded! - {file.name}</span>}
      </div>
    </div>
  );
}

export default App;
