import React, { useState } from 'react';
import axios from 'axios';
import './App.css'
// lib
import api from './lib/axios';
import Sidebar from './UI/Sidebar';
// pages
import LandMarkDetection from './pages/LandMarkDetection';
import DocumentTranslator from './pages/DocumentTranslator';
import ResizeImage from './pages/ResizeImage';

function App() {

  const [file, setFile] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null)
  const [navto,setNafto] = useState('landmark')



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
      
    }

  };

 
  return (
    <div className='h-screen'>
      {/* <LandMarkDetection/> done */}
      {/* <DocumentTranslator/> Need to work on it  */}
      {/* <ResizeImage/> need to work on it */}
      <Sidebar content={<DocumentTranslator/>}/>
     
     {/* resized */}
      {/* {!loading && <button onClick={handleUpload} className='btn btn-neutral mt-3'>Upload</button>}
      {loading && <button className="btn btn-neutral mt-3">
        <span className="loading loading-spinner"></span>
        Loading
      </button>} */}

    </div>
  );
}

export default App;
