import React from "react"

const Button = ({ children, disabled, onClick, style }) => {
    return (
        <button className="button" style={style} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    )
};

export default Button;
