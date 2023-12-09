import React, { useState } from "react";

const Input = ({ label, onChange, value, error, name, required, pattern, type, description, phoneMask }) => {

    const [isActive, setIsActive] = useState(false);

    const handleFocus = () => {
        setIsActive(true);
    };

    const handleBlur = (e) => {
        setIsActive(false);

    };

    return (
        <div className={`input ${error && 'error-border'}`}>
            <label
                htmlFor={name}
                className={`${isActive || value ? "active" : ""} ${error && 'error-text'}`}
            >
                {label}
            </label>
            <input

                id={name}
                name={name}
                value={value}
                pattern={pattern}
                type={type}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-label="Some text"
                required={required}

            />
            {error && <span className="error">{error}</span>}
            {!error && description && <span className="description">{description}</span>}
        </div>
    );
};

export default Input;
