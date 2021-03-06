import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import './Board.css'
import List from './List'

export default function Board() {
    const [lists, setLists] = useState([])
    const [initialLoadDone, setInitialLoadDone] = useState(false)
    const [board_id, setBoard_id] = useState();
    const [action, setAction] = useState();
    const [cardToMove, setCardToMove] = useState([]);
    const [cardIsMoving, setCardIsMoving] = useState(false);
    const [boardNumber, setBoardNumber] = useState()

    let history = useHistory();

    //Get data for current board
    const getBoardData = async () => {
        let boardData;
        const response = await fetch(`https://crutcher-kanban-back.herokuapp.com${window.location.pathname}`);
        const boardDataResponse = await response.json();
        boardData = JSON.stringify(boardDataResponse);
        boardData = JSON.parse(boardData)[0];
        if (boardData !== undefined) {
            setBoard_id(boardData._id)
            setBoardNumber(boardData.boardID)
            setLists(boardData.lists)
            setInitialLoadDone(true)
        } else {
            history.push('/');
            alert("Please enter a valid room number.");
        }
    };

    useEffect(() => {
        getBoardData();
        // eslint-disable-next-line
    }, [])

    //Update server if lists change locally
    useEffect(() => {
        if (!initialLoadDone) return
        if (action === "PUTLIST") {
            //Send post request with updated lists
            (async () => {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ boardID: board_id, lists: lists })
                };
                await fetch(`https://crutcher-kanban-back.herokuapp.com${window.location.pathname}/lists`, requestOptions);
            })()
            setAction();
        }
        // eslint-disable-next-line
    }, [lists])

    //Change title of a list
    const changeTitle = (e, index) => {
        let updatedLists = lists.map(item => {
            if (lists.indexOf(item) === index) {
                return { ...item, title: e }
            }
            return item;
        })
        setAction("PUTLIST");
        setLists(updatedLists);
    }

    //Delete a list
    const deleteList = (listToRemove) => {
        let list_id = lists[listToRemove]._id;
        (async () => {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boardID: board_id, listToRemove: list_id })
            };
            await fetch(`https://crutcher-kanban-back.herokuapp.com${window.location.pathname}/lists`, requestOptions);
            getBoardData();
        })()
    }

    //Create a new empty list
    const generateNewList = () => {
        (async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boardID: board_id })
            };
            await fetch(`https://crutcher-kanban-back.herokuapp.com${window.location.pathname}/lists`, requestOptions);
            getBoardData();
        })()
    }

    //Add a new card to a list
    const addItem = (val, index) => {
        let list_id = lists[index]._id;
        (async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boardID: board_id, index: index, cardTitle: val })
            };
            await fetch(`https://crutcher-kanban-back.herokuapp.com${window.location.pathname}/lists/${list_id}`, requestOptions);
            getBoardData();
        })()
    }

    //Update a card
    const updateCard = (cardIndex, listIndex, title, isChecked) => {
        let updatedLists = lists.map(list => {
            if (lists.indexOf(list) === listIndex) {
                let updatedCards = list.cards.map((card, index) => {
                    if (index === cardIndex) {
                        return { ...card, title: title, isChecked: isChecked }
                    }
                    return card;
                })
                list.cards = updatedCards;
                return list;
            }
            return list;
        })
        setAction("PUTLIST");
        setLists(updatedLists);
    }

    //Delete a card
    const deleteCard = (cardToRemove, listIndex) => {
        let list_id = lists[listIndex]._id;
        (async () => {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boardID: board_id, listIndex: listIndex, cardToRemove: lists[listIndex].cards[cardToRemove]._id })
            };
            await fetch(`https://crutcher-kanban-back.herokuapp.com${window.location.pathname}/lists/${list_id}`, requestOptions);
            getBoardData();
        })()
    }

    //Delete the current board
    const deleteBoard = () => {
        (async () => {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boardID: board_id })
            };
            await fetch(`https://crutcher-kanban-back.herokuapp.com${window.location.pathname}`, requestOptions);
        })()
        history.push('/');
    }

    //Get cardToMove index and the list it is starting from
    const startMoveCard = (card, startingList) => {
        setCardToMove([card, startingList]);
        setCardIsMoving(true);
    }

    //Cancel the move
    const cancelMoveCard = () => {
        setCardIsMoving(false);
        setCardToMove([]);
    }

    //Move card to other list
    const moveCard = (endList) => {
        let cardIndex = cardToMove[0];
        let startList = cardToMove[1];
        let movingCard = lists[startList].cards[cardIndex];


        //Move to end of current list if same list is clicked
        if (startList === endList) {
            //Do nothing if card is already in the last position
            if (lists[startList].cards.length === 1 || cardIndex === lists[startList].cards.length - 1) {
                cancelMoveCard();
                return;
            }
            let updatedLists = lists.map(list => {
                if (lists.indexOf(list) === startList) {
                    let card = JSON.stringify(list.cards[cardIndex]);
                    card = JSON.parse(card);
                    list.cards.splice(cardIndex, 1);
                    list.cards.push(card);
                    return list;
                }
                return list;
            })
            setAction("PUTLIST");
            setLists(updatedLists);
            cancelMoveCard();
            return;
        }

        //Move the card from starting list to the end list
        let updatedLists = lists.map(list => {
            //Remove from the startlist
            if (lists.indexOf(list) === startList) {
                let updatedCards = list.cards.filter(card => card._id !== movingCard._id)
                return { ...list, cards: updatedCards }

                //Add to endlist
            } else if (lists.indexOf(list) === endList) {
                let cardToAdd = JSON.stringify(movingCard);
                cardToAdd = JSON.parse(cardToAdd);
                list.cards.push(cardToAdd);
                return list;
            }
            return list;
        })
        setLists(updatedLists);
        cancelMoveCard();
    }

    const confirmDeleteBoard = () => {
        let deleteVerify = window.confirm("Are you sure you want to delete this board? This cannot be undone.");
        if (deleteVerify) deleteBoard();
    }

    return (
        <div id="board">
            <div id="board-number">
                Board #{boardNumber}
            </div>
            <div id="board-main">
                <div id="lists">
                    {lists.map((list, index) => {
                        return <List key={list._id} listIndex={index} title={list.title} cards={list.cards}
                            changeTitle={changeTitle} addItem={addItem} deleteList={deleteList}
                            deleteCard={deleteCard} updateCard={updateCard} startMoveCard={startMoveCard}
                            cardIsMoving={cardIsMoving} moveCard={moveCard} cancelMoveCard={cancelMoveCard}
                            initialLoadDone={initialLoadDone} />
                    })}
                </div>
                <div id="buttons">
                    <div id="home-btn-container">
                        <button id="home-btn" onClick={() => history.push(`/`)}>Home</button>
                    </div>
                    <div>
                        <button id="new-list-btn" onClick={() => generateNewList()}>New List</button>
                    </div>
                    <div >
                        <button id="delete-board-btn" onClick={() => confirmDeleteBoard()}>Delete Board</button>
                    </div>
                </div>
            </div>
        </div>
    )
}