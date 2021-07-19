import React, { useState } from 'react'

import './List.css'

import Card from './Card'

export default function List({ listIndex, title, cards, changeTitle, addItem, deleteList, deleteCard, updateCard, startMoveCard, cardIsMoving, moveCard, cancelMoveCard, initialLoadDone }) {
    const [newItem, setNewItem] = useState('')
    const [currentTitle, setCurrentTitle] = useState(title)
    const [newTitle, setNewTitle] = useState(currentTitle)

    const itemToAdd = (itemToAdd) => {
        setNewItem(itemToAdd);
    }

    const finishEdit = () => {
        setCurrentTitle(newTitle);
        changeTitle(newTitle, listIndex);
    }

    const handleKeyPressTitle = (e) => {
        if (e.keyCode === 13) {
            e.target.blur();
        }
    }

    const handleKeyPressAddItem = (e) => {
        if (e.keyCode === 13) {
            addItem(newItem, listIndex);
            setNewItem('');
        }
    }

    const confirmDeleteList = () => {
        let deleteVerify = window.confirm("Are you sure you want to delete this list? This cannot be undone.");
        if (deleteVerify) deleteList(listIndex);
    }

    return (
        <div>
            <div className="list">
                <div className="list-title-container">
                    <div className="list-title">
                        <textarea
                            className="title-input"
                            autoComplete="off"
                            spellCheck="false"
                            type="text"
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                            onKeyDown={e => handleKeyPressTitle(e)}
                            onBlur={() => finishEdit()}
                        />
                    </div>
                    <button id="delete-list-btn" onClick={() => confirmDeleteList()}>Delete</button>
                </div>

                {cardIsMoving ?
                    <div className="list-item-container" onClick={() => moveCard(listIndex)}>
                        {cards.map((card, index) => {
                            return <Card key={card._id} listIndex={listIndex} index={index} title={card.title}
                                isChecked={card.isChecked} deleteCard={deleteCard} updateCard={updateCard} startMoveCard={startMoveCard}
                                cardIsMoving={cardIsMoving} cancelMoveCard={cancelMoveCard} initialLoadDone={initialLoadDone} />
                        })}
                        <div id="accept-card-move">
                            Move card here!
                        </div>
                    </div>
                    :
                    <div className="list-item-container">
                        {cards.map((card, index) => {
                            return <Card key={card._id} listIndex={listIndex} index={index} title={card.title}
                                isChecked={card.isChecked} deleteCard={deleteCard} updateCard={updateCard} startMoveCard={startMoveCard}
                                cardIsMoving={cardIsMoving} cancelMoveCard={cancelMoveCard} initialLoadDone={initialLoadDone} />
                        })}
                    </div>
                }
                <div className="add-content-container">
                    <input type="text" className="add-content-input" autoComplete="off" value={newItem}
                        onChange={e => itemToAdd(e.target.value)} onKeyDown={e => handleKeyPressAddItem(e)} />
                    <button id="add-item-btn" type="submit" onClick={e => {
                        e.preventDefault()
                        addItem(newItem, listIndex)
                        setNewItem('')
                    }}>
                        Add Item
                    </button>
                </div>

            </div>
        </div>
    )
}
