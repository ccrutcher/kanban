import React, {useState, useEffect} from 'react'
import './Landing.css'

import {
    Link,
    useHistory
  } from "react-router-dom";


export default function Landing() {
    const [roomNumber, setRoomNumber] = useState('');
    const [submit, setSubmit] = useState(false);

    let history = useHistory();

    useEffect(() => {
        if(submit){
            history.push(`/board/${roomNumber}`)
        }
    }, [submit])

    const createRoom = () => {
        (async () => {
            const response = await fetch(`http://localhost:8000/createBoard`);
            const boardCreateResponse = await response.json();
            history.push(`/board/${boardCreateResponse.id}`);
        })()
    }

    return (
        <div id="main">
            <div id="selections">
                <form>
                    <input type="text" placeholder="Enter Room #" autoComplete="off" value={roomNumber} onChange={e => setRoomNumber(e.target.value)}></input>
                    <button type="submit" onClick={e => 
                            {
                                e.preventDefault()
                                setSubmit(true);
                            }}>
                            Enter
                        </button>
                </form>
                <button onClick={() => createRoom()}>Create New Room</button>
                <Link to="/demo">
                    <button>Demo</button>
                </Link>
            </div>
        </div>
    )
}
