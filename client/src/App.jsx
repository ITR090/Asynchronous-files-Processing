import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {

  const [file, setFile] = useState(null);
  
  const handleUpload = async () => {

    const formData = new FormData();
    formData.append("image", file);
    const backendUrl = process.env.NODE_ENV == 'development' 
    ? 'http://localhost:8080' 
    : '';
    console.log(backendUrl)
    await axios.post(`${backendUrl}/upload`, formData);
    alert("Image uploaded and processing started!");

  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default App;
