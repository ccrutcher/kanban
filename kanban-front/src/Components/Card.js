import React from 'react'

export default function Card({ index, listIndex, title, isChecked, deleteCard}) {
    return (
        <div className="card">
            {title}
            <button onClick={() => deleteCard(index, listIndex)}>Delete</button>
        </div>
    )
}
