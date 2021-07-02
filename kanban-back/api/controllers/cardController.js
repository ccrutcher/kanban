const Board = require('../models/boardModel');

//Get all cards for selected list
//TEST THIS
exports.list_cards = function(req, res) {
    console.log("list cards")

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
        console.log("Something went wrong while creating the card");
        console.log(err);
        res.send(err);
      }
      res.json(board);
    });
};

//Update the lists cards and then save to MongoDB
exports.update_cards = async function(req, res) {
    console.log("update cards")
//   const currentBoard = await Board.findOne({ _id: req.body.boardID});  
//   currentBoard.lists = req.body.lists;

//   currentBoard.save(function(err, board) {
//     if (err){
//       console.log("Something went wrong while updating the lists");
//       console.log(err)
//       res.send(err);
//     }
//     res.json(board);
//   });
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
        console.log("Something went wrong while deleting the card");
        console.log(err)
        res.send(err);
    }
    res.send(board);
    });
};


// db.collection('connect').update({_id: id}, {$push: {[str]: item}}); 