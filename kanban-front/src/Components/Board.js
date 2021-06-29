import React, {useState, useEffect} from 'react'

import './Board.css'

import List from './List'

import {
    useHistory
  } from "react-router-dom";

export default function Board() {
    const [lists, setLists] = useState([])

    let history = useHistory()

    useEffect(() => {
        let roomData = history.location.state.info;
        roomData.forEach(list => {
            setLists([...lists, {title: list.title, content: list.cards}])
        })
    }, [])

    const generateNewList = () => {
        setLists([...lists, {title: "Unitlted", content: []}]);
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
                return{...item, content: [...item.content, val]}
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
                    return <List key={index} index={index} title={list.title} content={list.content} changeTitle={changeTitle} addItem={addItem} deleteList={deleteList} />
                })}
            </div>
            <div id="new-list-container">
                <button onClick={() => generateNewList()}>New List</button>
            </div>
        </div>
    )
}
