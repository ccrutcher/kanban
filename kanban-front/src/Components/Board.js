import React, {useState, useEffect} from 'react'

import './Board.css'

import List from './List'


export default function Board() {
    const [lists, setLists] = useState([])
    const [initialLoadDone, setInitialLoadDone] = useState(false)

    //Get data for current board
    useEffect(() => {
        let boardData;
        (async () => {
            const response = await fetch(`http://localhost:8000${window.location.pathname}`);
            const boardDataResponse = await response.json();
            boardData = JSON.stringify(boardDataResponse);
            boardData = JSON.parse(boardData)[0];
            console.log(boardData);
            /*boardData.lists.forEach(list => {
                console.log([...lists, {title: list.title, cards: list.cards, index: list.index}])
                setLists([...lists, {title: list.title, cards: list.cards, index: list.index}])
                console.log(lists)
            })*/
            setLists(boardData.lists)
            setInitialLoadDone(true)
        })()
    }, [])

    //Update server if lists change locally
    useEffect(() => {
        if(initialLoadDone){
            console.log("Update Server")
        }
    }, [lists])


    const generateNewList = () => {
        setLists([...lists, {title: "Unitlted", cards: []}]);
    }

    const changeTitle = (e, index) => {
        let updatedLists = lists.map(item => {
            if(lists.indexOf(item) === index){
                return{...item, title: e}
            }
            return item;
        })
        setLists(updatedLists);
    }

    const addItem = (val, index) => {       
        let updatedLists = lists.map(item => {
            if(lists.indexOf(item) === index){
                return{...item, cards: [...item.cards, val]}
            }
            return item;
        })
        setLists(updatedLists);
    }

    const deleteList = (listToRemove) => {
        let remainingLists = []; 
        lists.forEach(item => {
            if(lists.indexOf(item) !== listToRemove){
                remainingLists.push(item);
            }
        })
       setLists(remainingLists)
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
            <div id="log-list-data">
                <button onClick={() => (() => {console.log(lists)})()}>Log lists</button>
            </div>
        </div>
    )
}
