import React from "react"

const Radio = ({ pos, onChange, selectedPosition }) => {

    return (<div className="radio">
        <input
            id={pos.id}
            type="radio"
            value={pos.id} name={pos.name}
            onChange={onChange}
            checked={pos.id === selectedPosition} />
        <label for={pos.id} class="radio-label">{pos.name}</label>
    </div>
    )
};

export default Radio;
