import React, {useState, useEffect} from 'react'

import {
    useHistory
  } from "react-router-dom";

import './Board.css'

import List from './List'



export default function Board() {
    const [lists, setLists] = useState([])
    const [initialLoadDone, setInitialLoadDone] = useState(false)
    const [board_id, setBoard_id] = useState();
    const [action, setAction] = useState();

    let history = useHistory();

//Get data for current board
    const getBoardData = async () => {
        let boardData;
        const response = await fetch(`http://localhost:8000${window.location.pathname}`);
        const boardDataResponse = await response.json();
        boardData = JSON.stringify(boardDataResponse);
        boardData = JSON.parse(boardData)[0];
        setBoard_id(boardData._id)
        setLists(boardData.lists)
        setInitialLoadDone(true)
    };

    useEffect(() => {
        getBoardData();
    }, [])

//Update server if lists change locally
    useEffect(() => {
        if(!initialLoadDone) return
        if(action === "PUT"){
            console.log("Update Server");
            //Send post request with updated lists
            (async () => {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ boardID: board_id, lists: lists })
                };
                const response = await fetch(`http://localhost:8000${window.location.pathname}/lists`, requestOptions);
                const data = await response.json();
                const stringData = JSON.stringify(data);
                const parsedData = JSON.parse(stringData);
            })()
            setAction();
        }
    }, [lists])

//Change title of a list
    const changeTitle = (e, index) => {
        let updatedLists = lists.map(item => {
            if(lists.indexOf(item) === index){
                return{...item, title: e}
            }
            return item;
        })
        setAction("PUT");
        setLists(updatedLists);
    }

//Delete a list
    const deleteList = (listToRemove) => {
        let list_id = lists[listToRemove]._id;
        (async () => {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boardID: board_id, listToRemove: list_id })
            };
            const response = await fetch(`http://localhost:8000${window.location.pathname}/lists`, requestOptions);
            const data = await response.json();
            const stringData = JSON.stringify(data);
            const parsedData = JSON.parse(stringData);
            getBoardData();
        })()

    }

//Create a new empty list
    const generateNewList = () => {
        (async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boardID: board_id })
            };
            const response = await fetch(`http://localhost:8000${window.location.pathname}/lists`, requestOptions);
            const data = await response.json();
            const stringData = JSON.stringify(data);
            const parsedData = JSON.parse(stringData);
            console.log(parsedData);
            getBoardData();
        })()
    }



//Add a new card to a list
    const addItem = (val, index) => {       
        let updatedLists = lists.map(item => {
            if(lists.indexOf(item) === index){
                return{...item, cards: [...item.cards, val]}
            }
            return item;
        })
        setLists(updatedLists);
    }

//Delete the current board
    const deleteBoard = () => {
        (async () => {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boardID: board_id })
            };
            const response = await fetch(`http://localhost:8000${window.location.pathname}`, requestOptions);
            const data = await response.json();
            const stringData = JSON.stringify(data);
            const parsedData = JSON.parse(stringData);
        })()
        history.push('/');
    }

    return (
        <div id="main">
            <div id="lists">
                {lists.map((list, index) => {
                    return <List key={index} index={index} title={list.title} cards={list.cards} changeTitle={changeTitle} addItem={addItem} deleteList={deleteList} />
                })}
            </div>
            <div id="new-list-container">
                <button onClick={() => generateNewList()}>New List</button>
            </div>
            <div id="delete-board">
                <button onClick={() => deleteBoard()}>Delete Board</button>
            </div>

            <div id="log-list-data">
                <button onClick={() => (() => {console.log(lists)})()}>Log lists</button>
            </div>
        </div>
    )
}
