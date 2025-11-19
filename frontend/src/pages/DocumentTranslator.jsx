import {useState} from "react";
import Card from "../UI/Card";
import FileUpload from "../UI/FileUpload";
import api from "../lib/axios";

export default function DocumentTranslator() {

    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null)

    const handleDocumentTranslator = async (file) => {
        console.log("file", file)   
        
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);
    
            // need to change the api endpoint
            const response = await api.post(`/documentTranslator`, formData);

            if (response.status === 200) {
                console.log(response.data)
                setFeedback({
                    status: "success",
                    message: response.data.message.data[0],
                    url: response.data.url
                })
            }

        } catch (error) {
            console.log(error)
            if (error.status === 400) {
                setFeedback({
                    status: "error",
                    message: error.response.data.message,
                })
            } else if (error.status === 500) {
                setFeedback({
                    status: "error",
                    message: error.response.data.message,
                })
            } else {
                console.log(error)
                setFeedback({
                   status: "error",
                   message: error.response.data.message,
                })
            }
        } finally {
            setLoading(false);
        }

    }
    return (
        <Card>
            <h1 className="text-2xl font-bold my-2">AI-Powered Document Translator</h1>

            <p className="my-2">
                Easily translate text from scanned documents, images, or photos using Google Cloud Vision and Translation APIs. Our tool automatically extracts text with advanced OCR (Optical Character Recognition) and instantly translates it into your preferred language. Perfect for reading contracts, forms, letters, and any foreign-language documents with speed and accuracy.
            </p>

            <div className="my-2 list">
                <h2 className="text-lg font-semibold my-2">How it works:</h2>
                <ol className="list-decimal list-inside">
                    <li>📷 Upload a document image (JPEG, PNG, PDF).</li> 
                    <li>🔎 The AI extracts the text using OCR technology.</li>
                    <li>🌐 The extracted text is translated into your chosen language.</li>
                    <li>⚡ Receive the translated text instantly on-screen.</li>
                </ol>     
            </div>

            <div className="w-full">
                <FileUpload text="Upload Document" types='Word or Pdf up to 1 page' onFileChange={handleDocumentTranslator} />
            </div>

            {loading && <div className="w-fit flex flex-col justify-center items-center content-center mx-auto mt-5">
                <span className="loading loading-spinner loading-xl"></span>
            </div>}


            {/* {feedback?.status == "success" && <div className="card lg:card-side bg-base-100 shadow-sm mt-5">
                <figure>
                    <img
                        src={feedback?.url}
                        alt="img" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{feedback?.message?.description}</h2>
                    <iframe
                        title="Google Map"
                        src={`https://www.google.com/maps?q=${feedback?.message?.locations?.[0]?.latLng?.latitude},${feedback.message?.locations?.[0]?.latLng?.longitude}&hl=es;z=14&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
            </div>} */}


            {feedback?.status == "error" && <div className="card lg:card-side bg-base-200 shadow-sm mt-5">

                <div role="alert" className="alert alert-error w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{feedback?.message}</span>
                </div>
            </div>}

        </Card>
    )
}