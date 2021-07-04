import React, {useState, useEffect} from 'react'
import './Landing.css'
import {useHistory} from "react-router-dom";


export default function Landing() {
    const [roomNumber, setRoomNumber] = useState('');
    const [submit, setSubmit] = useState(false);

    let history = useHistory();

    useEffect(() => {
        if(submit){
            history.push(`/board/${roomNumber}`)
        }
    // eslint-disable-next-line
    }, [submit])


    //Send a post request to create a new board
    const createRoom = () => {
        (async () => {
            const requestOptions = {
                method: 'POST'
            };
            const response = await fetch(`http://localhost:8000/board/createBoard`, requestOptions);
            const boardCreateResponse = await response.json();
            history.push(`/board/${boardCreateResponse.boardID}`);
        })()
    }

    return (
        <div id="landing-main">

            <div id="landing-title">
                Kanban
            </div>
            <div id="selections">
                <form id="enter-room-form">
                    <input id="room-number-input" type="text" placeholder="Enter Room #" autoComplete="off" value={roomNumber} onChange={e => setRoomNumber(e.target.value)}></input>
                    <button className="landing-btn" id="enter-room-btn" type="submit" onClick={e => 
                            {
                                e.preventDefault()
                                setSubmit(true);
                            }}>
                            Enter
                        </button>
                </form>
                <div id="or">
                    OR
                </div>
                <button className="landing-btn" id="create-board-btn" onClick={() => createRoom()}>Create New Room</button>
            </div>
        </div>
    )
}
