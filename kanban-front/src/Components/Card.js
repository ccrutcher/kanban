import React, { useState, useEffect } from 'react'
import './Card.css'

export default function Card({ index, listIndex, title, isChecked, deleteCard, updateCard, startMoveCard, cardIsMoving, cancelMoveCard, initialLoadDone }) {
    const [checked, setChecked] = useState(isChecked)
    const [showButtons, setShowButtons] = useState(false)
    const [edit, setEdit] = useState(false)
    const [currentTitle, setCurrentTitle] = useState(title)
    const [newTitle, setNewTitle] = useState(currentTitle)

    useEffect(() => {
        if (!initialLoadDone) return;
        updateCard(index, listIndex, newTitle, checked);
        // eslint-disable-next-line
    }, [checked])

    const finishEdit = () => {
        setCurrentTitle(newTitle);
        updateCard(index, listIndex, newTitle, checked);
        setEdit(false);
    }

    const handleKeyPressEditCard = (e) => {
        if (e.keyCode === 13) {
            e.target.blur();
        }
    }

    return (
        <div className="card-main">
            {edit ? (
                <div className="card-container">
                    <input visibility="hidden" id="checkbox" type="checkbox" checked={checked} onChange={() => { setChecked(!checked) }} />
                    <div style={{ textDecoration: checked === true ? 'line-through' : 'none' }} >
                        <form id="card-title-form">
                            <input id="edit-card-title" type="text" autoComplete="off" spellCheck="false" value={newTitle} onChange={e => setNewTitle(e.target.value)}
                                onKeyDown={e => handleKeyPressEditCard(e)} onBlur={() => finishEdit()} autoFocus />
                        </form>
                    </div>
                    <button id="edit-button" className="card-button" onClick={() => document.getElementById('edit-card-title').blur()}>Done</button>
                </div>
            ) : (
                <div className="card-container" onMouseEnter={() => setShowButtons(true)} onMouseLeave={() => setShowButtons(false)}>
                    <input id="checkbox" type="checkbox" checked={checked} onChange={() => { setChecked(!checked) }} />
                    <div id="card-title" style={{ textDecoration: checked === true ? 'line-through' : 'none' }} >
                        {currentTitle}
                    </div>
                    {
                        showButtons && (
                            <div id="button-container">
                                {cardIsMoving ?
                                    <button id="edit-button" className="card-button" onClick={() => cancelMoveCard}>Cancel</button>
                                    :
                                    <>
                                        <button id="edit-button" className="card-button" onClick={() => setEdit(true)}>Edit</button>
                                        <button id="move-button" className="card-button" onClick={() => startMoveCard(index, listIndex)}>Move Card</button>
                                        <button id="delete-button" className="card-button" onClick={() => deleteCard(index, listIndex)}>Delete</button>
                                    </>
                                }
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    )
}
