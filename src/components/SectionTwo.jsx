import React from "react"
import Card from "./Card";
import Button from "../ui/Button";

const SectionTwo = ({ users, handleShowMore, state }) => {
    return (
        <div className="section-two">
            <div className="container">
                <div className="block">
                    <p className="title">Working with GET request</p>
                    <div className="users">
                        {users?.map(user => (
                            <Card user={user} />
                        ))}
                    </div>
                    <Button disabled={state?.page === state?.total_pages} onClick={handleShowMore} style={{ width: '120px' }}>Show more</Button>

                </div> </div>
        </div>
    )
};

export default SectionTwo;
