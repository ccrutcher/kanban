import React, {useState} from 'react'

import './List.css'

import Card from './Card'

export default function List({listIndex, title, cards, changeTitle, addItem, deleteList, deleteCard}) {
    const [newItem, setNewItem] = useState('')

    const itemToAdd = (itemToAdd) => {
        setNewItem(itemToAdd)
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            e.target.blur();
        }
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
                            defaultValue={title}
                            onBlur={e => changeTitle(e.target.value, listIndex)}
                            onKeyDown={e => handleKeyPress(e)}
                        />
                    </div>
                    <button onClick={() => deleteList(listIndex)}>Delete</button>
                </div>

                <div className="list-item-container">
                    {cards.map((card, index) => {
                        return <Card key={index} listIndex={listIndex} index={index} title={card.title} isChecked={card.isChecked} deleteCard={deleteCard} />
                    })}
                </div>

                <div className="add-content-container">
                    <form>
                        <input type="text" className="add-content-input" autoComplete="off" value={newItem} onChange={e => itemToAdd(e.target.value)} />
                        <button type="submit" onClick={e => 
                            {
                                e.preventDefault()
                                addItem(newItem, listIndex)
                                setNewItem('')
                            }}>
                            Add Item
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}
