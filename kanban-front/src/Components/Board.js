import React, {useState} from 'react'

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
       console.log(lists);
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
