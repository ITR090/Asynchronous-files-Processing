import React, { useState } from "react";
import Card from "../UI/Card";
import FileUpload from "../UI/FileUpload";
import api from "../lib/axios";
// components
import ErrorFeedback from "../components/ErrorFeedback";
import Loading from "../components/Loading";

export default function LandMarkDetection() {

    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null)

    const handleLandmarks = async (file) => {

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            const response = await api.post(`/uploadLandmark`, formData);
            // console.log("response", response)
            if (response.status === 200) {
                setFeedback({
                    status: "success",
                    message: response.data.message.data[0],
                    url: response.data.url
                })
            }
        } catch (error) {
            if (error.status === 400) {
                // console.log("error", error.response.data.message)
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
                    message: error.response.data.message
                })
            }
        } finally {
            setLoading(false);
        }
    }


    return (
        <Card>
            <h1 className="text-2xl font-semibold my-2">AI Landmark Recognition</h1>
            <p className="my-2">Discover and identify landmarks instantly with the power of Google Cloud Vision API. Simply upload a photo of a famous monument, natural wonder, or cityscape, and our system automatically recognizes the landmark and provides detailed information about it.</p>

            <div className="my-2 list">
                <h2 className="text-lg font-semibold my-2">How it works:</h2>
                <ol className="list-decimal list-inside">
                    <li>🖼  Make sure to upload a very clear image so AI can detect and recognize landmark</li>
                    <li>🔎 Automatically detect and recognize landmarks using AI</li>
                    <li>📍 Get location details with latitude & longitude coordinates</li>
                    <li>🌍 Explore background information about the detected place</li>
                    <li>⚡ Fast, accurate, and easy to use for travelers, students, and researchers</li>
                </ol>
            </div>

            <h4 className="text-lg font-semibold my-2">Upload a photo and instantly identify famous landmarks around the world with AI</h4>
            <div className="w-full my-2">
                <FileUpload text='Upload an image' types='png or jpg up to 1 image' onFileChange={handleLandmarks} />
            </div>


            {loading && <Loading />}

            {feedback?.status == "success" && <div className="card lg:card-side bg-base-100 shadow-sm mt-5">
                <figure className="w-1/4">
                    <img
                        src={feedback?.url}
                        alt="img" 
                        />
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
            </div>}


            {feedback?.status == "error" && <ErrorFeedback message={feedback.message} />}

        </Card>
    )
}