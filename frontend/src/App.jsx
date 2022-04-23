import React, { useRef, useState } from 'react';
import './App.css'

function App() {
  const ref = useRef()
  const [file, setFile] = useState(null)

  const handleUpload = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <div className='h-screen bg-blue-200 text-red-800 text-center'>
      <div className='relative top-40 flex flex-col items-center justify-center gap-y-10'>
        <h1 className='text-5xl font-bold'>Mood Predictor</h1>
        <input hidden type="file" accept="image/*" ref={ref} onChange={handleUpload} />
        <button className='px-4 py-2 rounded bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium' onClick={() => ref.current.click()}>Upload</button>
        {file && <span className='font-medium'>Uploaded! - {file.name}</span>}
      </div>
    </div>
  )
}

export default App;
