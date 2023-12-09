import React from "react"

const Card = ({ user }) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src={user?.photo} alt="some image" />
            </div>
            <p>{user?.name}</p>
            <div className="card-info">
                <p>{user.position}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
            </div>
        </div>
    )
};

export default Card;
