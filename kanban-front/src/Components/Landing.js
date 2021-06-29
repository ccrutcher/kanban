import React, {useState, useEffect} from 'react'
import './Landing.css'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";

export default function Landing() {
    const [roomNumber, setRoomNumber] = useState('');
    const [roomData, setRoomData] = useState();
    const [submit, setSubmit] = useState(false);
    let history = useHistory();

    const numberToCheck = (numberToCheck) => {
        setRoomNumber(numberToCheck)
    }

    async function getRoom(roomNumber) {
        const response = await fetch(`http://localhost:8000/board/${roomNumber}/`);
        const roomDataResponse = await response.json();
        setSubmit(true);
        setRoomData(roomDataResponse);
    }

    useEffect(() => {
        if(submit){
            history.push(`/board/${roomNumber}`,
                          {info: roomData})
        }
    }, [roomData])

    return (
        <div id="main">
            <div id="selections">
                <form>
                    <input type="text" placeholder="Enter Room #" autoComplete="off" value={roomNumber} onChange={e => numberToCheck(e.target.value)}></input>
                    <button type="submit" onClick={e => 
                            {
                                e.preventDefault()
                                getRoom(roomNumber)
                            }}>
                            Enter
                        </button>
                </form>
                <button>Create New Room</button>
                <Link to="/demo">
                    <button>Demo</button>
                </Link>
            </div>
        </div>
    )
}
