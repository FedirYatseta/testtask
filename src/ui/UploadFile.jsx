import React from "react"
import { useState } from "react";

const UploadFile = ({ onChange, name, required, error, value }) => {



    return (
        <label className="file" htmlFor={name} >
            <input
                required={required}
                onChange={onChange}
                type="file"
                id={name}
                name={name}
                aria-label="File browser example"
                accept="image/jpeg, image/jpg" />
            <div className={`file-custom ${error ? 'error-1' : ''}`}><span >Upload</span></div>
            <div className={`file-name  ${error ? 'error-2' : ''}`}>
                {value ? (
                    <span className="active">{value}</span>
                ) : (
                    <span>Upload your photo</span>
                )}
            </div>
            {error && <span className="error">{error}</span>}
        </label>

    )
};

export default UploadFile;
