import { useState } from "react";
import Card from "../UI/Card";
import FileUpload from "../UI/FileUpload";
import api from "../lib/axios";
// icon
import { Copy, ArrowLeftRight } from "lucide-react";
// components
import ErrorFeedback from "../components/ErrorFeedback";
import Loading from "../components/Loading";

export default function DocumentTranslator() {

    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null)

    const handleDocumentTranslator = async (file) => {
        
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);

            // need to change the api endpoint
            const response = await api.post(`/documentTranslator`, formData);

            if (response.status === 200) {
                // console.log(response)
                setFeedback({
                    status: "success",
                    content: response.data.message.data.contents[0],
                    translatedText: response.data.message.translatedText
                })
            }

        } catch (error) {
               // console.log(error)
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
                // console.log(error)
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
            <h1 className="text-2xl font-semibold my-2">AI-Powered Translator</h1>

            <p className="my-2">
                Easily translate text from  images, or photos using Google Cloud Vision and Translation APIs. 
                The tool automatically extracts text with advanced OCR (Optical Character Recognition) 
                and instantly translates it into your preferred language. 
                
            </p>

            <div className="my-2 list">
                <h2 className="text-lg font-semibold my-2">How it works:</h2>
                <ol className="list-decimal list-inside">
                    <li>📷 Upload a image (JPEG, PNG).</li>
                    <li>🔎 The AI extracts the text using OCR technology.</li>
                    <li>🌐 The extracted text is translated into your chosen language Beta (Arabic)</li>
                    <li>⚡ Receive the translated text instantly on-screen.</li>
                </ol>
            </div>

            <div className="w-full">
                <FileUpload text="Upload Document" types='Word or Pdf up to 1 page' onFileChange={handleDocumentTranslator} />
            </div>

            {loading && <Loading />}


            {feedback?.status == "success" && (
                <div className="max-w-4xl mx-auto mt-10">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Translation Result
                        </h1>
                        <p className="text-gray-500">English → Arabic</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Original Language */}
                        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-100">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold text-gray-700">English</h3>
                                <button

                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <Copy size={18} />
                                </button>
                            </div>

                            <p className="text-gray-800 whitespace-pre-wrap leading-6">
                                {feedback?.content}
                            </p>
                        </div>

                        {/* Translated Language */}
                        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-100">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold text-gray-700">Arabic</h3>
                                <button

                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <Copy size={18} />
                                </button>
                            </div>

                            <p
                                className="text-gray-800 whitespace-pre-wrap leading-7 text-right"
                                dir="rtl"
                            >
                                {feedback?.translatedText}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {feedback?.status == "error" && <ErrorFeedback message={feedback.message} />}

        </Card>
    )
}