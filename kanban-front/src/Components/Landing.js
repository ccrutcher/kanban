import React, { useState } from 'react'
import './Landing.css'
import { useHistory } from "react-router-dom";

export default function Landing() {
    const [roomNumber, setRoomNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    let history = useHistory();

    //Enter the room that is currently selected
    const enterRoom = async () => {
        let boardData;
        const response = await fetch(`https://crutcher-kanban-back.herokuapp.com/board/${roomNumber}`);
        const boardDataResponse = await response.json();
        boardData = JSON.stringify(boardDataResponse);
        boardData = JSON.parse(boardData)[0];
        if (boardData === undefined) {
            alert("Please input a valid room number")
            setRoomNumber('')
        } else {
            history.push(`/board/${roomNumber}`);
        }
    }

    //Send a post request to create a new board
    const createRoom = () => {
        setIsLoading(true);
        (async () => {
            const requestOptions = {
                method: 'POST'
            };
            const response = await fetch(`https://crutcher-kanban-back.herokuapp.com/board/createBoard`, requestOptions);
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
                    <button className="landing-btn" id="enter-room-btn" type="submit" onClick={e => {
                        e.preventDefault()
                        enterRoom()
                    }}>
                        Enter
                    </button>
                </form>
                <div id="or">
                    OR
                </div>
                { isLoading ? 
                <button className="landing-btn" id="create-board-btn">Loading...</button>
                :
                <button className="landing-btn" id="create-board-btn" onClick={() => createRoom()}>Create New Room</button>
                }
                

            </div>
        </div>
    )
}
