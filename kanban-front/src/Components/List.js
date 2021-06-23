import React from 'react'

export default function List({index, title, content, changeTitle, addItem}) {
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
                            value={title}
                            onChange={e => changeTitle(e.target.value, index)}
                        />
                    </div>
                </div>

                <div className="list-item-container">
                    {content.map((item, index) => {
                        return <div key={index}>
                            {item}
                            <button>Delete</button>
                        </div>
                    })}
                </div>

                <div className="add-content-container">
                    <form onSubmit={() => addItem()}>
                        <input type="text" autoComplete="off" />
                        <button type="submit">Add Item</button>
                    </form>
                </div>

            </div>
        </div>
    )
}
