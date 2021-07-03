import React, { useState, useEffect } from 'react'
import './Card.css'

export default function Card({ index, listIndex, title, isChecked, deleteCard, updateCard, startMoveCard, cardIsMoving, cancelMoveCard, initialLoadDone, cardToMove }) {
    const [checked, setChecked] = useState(isChecked)
    const [showButtons, setShowButtons] = useState(false)
    const [edit, setEdit] = useState(false)
    const [currentTitle, setCurrentTitle] = useState(title)
    const [newTitle, setNewTitle] = useState(currentTitle)

    useEffect(() => {
        if (!initialLoadDone) return
        updateCard(index, listIndex, currentTitle, checked);
        // eslint-disable-next-line
    }, [checked, currentTitle])

    return (
        <div>
            {edit ? (
                <div className="card-container" onMouseEnter={() => setShowButtons(true)} onMouseLeave={() => setShowButtons(false)}>
                    <input type="checkbox" checked={checked} onChange={() => { setChecked(!checked) }} />
                    <div style={{ textDecoration: checked === true ? 'line-through' : 'none' }} >
                        <form id="card-title-form">
                            <input type="text" autoComplete="off" spellCheck="false" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                        </form>
                    </div>
                    <div id="button-container">
                        <button id="edit-button" onClick={() => {
                            setCurrentTitle(newTitle);
                            setNewTitle();
                            setEdit(!edit);
                        }}>Done</button>
                    </div>
                </div>
            ) : (
                <div className="card-container" onMouseEnter={() => setShowButtons(true)} onMouseLeave={() => setShowButtons(false)}>
                    <input type="checkbox" checked={checked} onChange={() => { setChecked(!checked) }} />
                    <div style={{ textDecoration: checked === true ? 'line-through' : 'none' }} >
                        {currentTitle}
                    </div>
                    {
                        showButtons && (
                            <div id="button-container">

                                {cardIsMoving ?
                                    <button id="edit-button" onClick={() => cancelMoveCard}>Cancel</button>
                                :
                                    <button id="edit-button" onClick={() => setEdit(!edit)}>Edit</button>
                                }
                                <button id="move-button" onClick={() => startMoveCard(index, listIndex)}>Move Card</button>
                                <button id="delete-button" onClick={() => deleteCard(index, listIndex)}>Delete</button>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    )
}
