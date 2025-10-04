import React from "react";

export default function Card({children}) {
    return (
        <div className="m-5 p-5 bg-base-100">
            <div className="card bg-base-200 shadow-lg  p-5">
                {children}
            </div>
        </div>
    )
}