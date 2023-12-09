import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import axios from "axios";
import SectionOne from "./components/SectionOne";
import SectionTwo from "./components/SectionTwo";
import SectionThree from "./components/SectionThree";
import Preloader from "./ui/Preloader";

const App = () => {
    const [state, setState] = useState()
    const [load, setLoad] = useState(false)
    const [position, setPosition] = useState([])

    const handleShowMore = () => {
        setLoad(true);
        axios.get(state.links.next_url)
            .then((response) => {
                setState({ ...response.data, users: [...state.users, ...response.data.users] })
                setLoad(false);
            }
            )
    }


    useEffect(() => {
        setLoad(true);
        axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6')
            .then((response) => {
                setState(response.data)
                setLoad(false);
            })
        axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
            .then(res => {
                setPosition(res.data)
                setLoad(false);
            })
    }, [])
    return (<main className="app">
        {load && <Preloader />}

        <Header />
        <SectionOne />
        <SectionTwo users={state?.users} handleShowMore={handleShowMore} state={state} />
        <SectionThree position={position?.positions} setLoad={setLoad} />
    </main>)
};

export default App;