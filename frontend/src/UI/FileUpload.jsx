import React, {useState} from "react";
import { Upload } from "lucide-react";

export default function FileUpload({onFileChange, text, types}) {


  const handleFileChange = (e) => {    
    onFileChange(e.target.files[0]);
  }
  
  return (
    <div className="mt-3 flex flex-col items-center justify-center">
      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl cursor-pointer border-primary/60 hover:bg-base-200 transition">
        <div className="flex flex-col items-center justify-center pt-6 pb-6">
          <Upload className="w-10 h-10 text-primary mb-3" />
          <p className="mb-2 text-base font-semibold text-gray-700">
            {text}
          </p>
          <p className="text-sm text-gray-500">{types}</p>
        </div>
        <input type="file" className="hidden" onChange={handleFileChange}/>
      </label>
    </div>
  );
}