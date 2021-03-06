const Board = require('../models/boardModel');

//Get all cards for selected list
//TEST THIS
exports.list_cards = function(req, res) {
    Board.lists.findOne({ _id: req.body.listID}, function(err, list) {
    if (err)
        res.send(err);
    res.json(list.cards);
    });
};

//Create a new card and then save to MongoDB
exports.create_a_card = async function(req, res) {
    let index = req.body.index
    const currentBoard = await Board.findOne({ _id: req.body.boardID});  

    currentBoard.lists[index].cards.push({ title: req.body.cardTitle, index: currentBoard.lists[index].length })
    
    currentBoard.save(function(err, board) {
      if (err){
        res.send(err);
      }
      res.json(board);
    });
};

exports.delete_a_card = async function(req, res) {
    const currentBoard = await Board.findOne({ _id: req.body.boardID});
    let listIndex = req.body.listIndex;
    let oldCards = currentBoard.lists[listIndex].cards;
    let updatedCards = [];
    oldCards.forEach(card => {
        if(card._id != req.body.cardToRemove){
            updatedCards.push(card)
        }
    });

    currentBoard.lists[listIndex].cards = updatedCards;

    currentBoard.save(function(err, board) {
    if (err){
        res.send(err);
    }
    res.send(board);
    });
};