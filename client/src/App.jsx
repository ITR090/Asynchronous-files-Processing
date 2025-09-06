import React, { useState } from 'react';
import axios from 'axios';
import './App.css'
// lib
import api from './lib/axios';

function App() {

  const [file, setFile] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null)

  const handleUpload = async () => {

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(`/upload`, formData);
      
      if (response.status === 200) {
        setFeedback({
          type: "success",
          message: response.data.message,
        })
      }

    } catch (error) {
      
      if (error.status === 400) {
        setFeedback({
          type: "error",
          message: error.response.data.eer_message,
        })
      } else if (error.status === 500) {
        setFeedback({
          type: "error",
          message: error.response.data.eer_message,
        })
      } else {
        console.log(error)
        setFeedback({
          type: "error",
          message: error.response.data.eer_message,
        })
      }
    } finally {
      setLoading(false);
      setFile(null);
      setSelected(null);
    }

  };

  return (
    <div className='flex flex-col justify-center items-center content-center h-screen w-screen'>
      <h1 className='mb-3'>Upload image or pdf file</h1>
      <input type="file" onChange={e => setFile(e.target.files[0])} className='mb-3 file-input file-input-neutral inline-block' />
      <div className='w-auto'>
        <div className='flex gap-2 cursor-pointer mt-1'>
          <input type="checkbox" checked={selected === "resize"} onChange={() => setSelected(selected === "resize" ? null : "resize")} className="checkbox" />
          <label className='text-sm'>Resize</label>
        </div>
        <div className='flex gap-2 cursor-pointer mt-1'>
          <input type="checkbox" checked={selected === "compress"} onChange={() => setSelected(selected === "compress" ? null : "compress")} className="checkbox" />
          <label className='text-sm'>Compress</label>
        </div>
      </div>
      {!loading && <button onClick={handleUpload} className='btn btn-neutral mt-3'>Upload</button>}
      {loading && <button className="btn btn-neutral mt-3">
        <span className="loading loading-spinner"></span>
        Loading
      </button>}

      {feedback && (<div role="alert" className={`alert alert-${feedback.type} mt-5`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{feedback.message}</span>
      </div>)}




    </div>
  );
}

export default App;
