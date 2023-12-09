import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import axios from "axios";
import SectionOne from "./components/SectionOne";
import SectionTwo from "./components/SectionTwo";
import SectionThree from "./components/SectionThree";

const App = () => {
    const [state, setState] = useState()

    const [position, setPosition] = useState([])

    const handleShowMore = () => {
        axios.get(state.links.next_url)
            .then((response) => {
                setState({ ...response.data, users: [...state.users, ...response.data.users] })
            }
            )
    }


    useEffect(() => {
        axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6')
            .then((response) => {
                setState(response.data)
            })
        axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
            .then(res => {
                setPosition(res.data)
            })
    }, [])
    return (<main className="app">

        <Header />
        <SectionOne />
        <SectionTwo users={state?.users} handleShowMore={handleShowMore} state={state} />
        <SectionThree position={position?.positions} />
    </main>)
};

export default App;