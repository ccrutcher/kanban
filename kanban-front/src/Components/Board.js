import React, {useState, useEffect} from 'react'

import './Board.css'

import List from './List'

export default function Board() {
    const [lists, setLists] = useState([{title: "To Do", content: ['read', 'eat']}, {title: "In Progress", content: []}, {title: "Completed", content: []}])

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

    const addItem = (e, index) => {
        e.preventDefault();

        let updatedLists = lists.map(item => {
            if(lists.indexOf(item) === index){

            }
        })
    }

    return (
        <div id="main">
            <div id="lists">
                {lists.map((list, index) => {
                    return <List key={index} index={index} title={list.title} content={list.content} changeTitle={changeTitle} />
                })}
                <div id="new-list-container">
                    <button onClick={() => generateNewList()}>New List</button>
                </div>
            </div>
        </div>
    )
}
