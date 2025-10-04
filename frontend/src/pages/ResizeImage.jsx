import React, {useState} from "react";
import Card from "../UI/Card";
import FileUpload from "../UI/FileUpload";
import api from "../lib/axios";

export default function ResizeImage() {


    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null)

    const handleResizeImage =  async (file) => {

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);

            const response = await api.post(`/upload`, formData);

            if (response.status === 200) {
                console.log(response.data)
                setFeedback({
                    url: response.url
                })
            }

        } catch (error) {

            if (error.status === 400) {
                setFeedback({
                    type: "error",
                    message: error
                })
            } else if (error.status === 500) {
                setFeedback({
                    type: "error",
                    message: error
                })
            } else {
                console.log(error)
                setFeedback({
                    type: "error",
                    message: error
                })
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <Card>
            <h1 className="text-2xl font-bold my-2">Resize Image</h1>
            <p className="">ResizeImageResizeImageResizeImageResizeImageResizeImage</p>

            <div className="my-3 flex flex-wrap justify-center  gap-2">
                <span className="badge">300 300</span>
                <span className="badge">500 500</span>
                <span className="badge">600 600</span>
                <span className="badge">700 700</span>
            </div>
            <div className="w-full">
                <FileUpload text="Upload Image" types='png or jpg up to 1 image' onFileChange={handleResizeImage} />
            </div>

            {loading && <div className="w-fit flex flex-col justify-center items-center content-center mx-auto mt-5">
                <span className="loading loading-spinner loading-xl"></span>
            </div>}


            {feedback && <div className="mt-5">
                <img src={feedback.url} alt="Resized" className="" />
            </div>}

        </Card>
    )
}