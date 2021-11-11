import './App.css';
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jit from "./components/Jit";

function App() {

    const room = ('meet_' + Date.now().toString(36));
    const username = 'Jhon Dou';
    const [end, setEnd] = useState(false);

    const handleStartMeeting = (roomName, userName, password, link) => {
        setEnd(false)
        console.log(roomName)
        console.log(userName)
        console.log(password)
        console.log(link)
    }

    const handleClose = () => {
        setEnd(true)
    }

    return (
        <div className="App mt-3">
            <Jit userName={username} roomName={room} handleStartMeeting={handleStartMeeting} handleClose={handleClose}/>
            {end && <h1 className="align-content-center align-items-center">Thank you !!!</h1>}
        </div>
    );
}

export default App;
