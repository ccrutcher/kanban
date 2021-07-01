const Board = require('../models/boardModel');

//Get all cards for selected list
exports.list_cards = function(req, res) {
//   Board.find({'boardID': req.params.boardId}, function(err, board) {
//     if (err)
//       res.send(err);
//     res.json(board.lists);
//   });
};

//Create a new card and then save to MongoDB
exports.create_a_card = async function(req, res) {
//   const currentBoard = await Board.findOne({ _id: req.body.boardID});  
//   currentBoard.lists.push({ cards: [], title: "Untitled", index: currentBoard.lists.length })

//   currentBoard.save(function(err, board) {
//     if (err){
//       console.log("Something went wrong while creating the list");
//       console.log(err)
//       res.send(err);
//     }
//     res.json(board);
//   });
};

//Update the lists cards and then save to MongoDB
exports.update_cards = async function(req, res) {
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
//   Board.findOneAndUpdate(
    // { '_id': req.body.boardID },
    // { $pull: { lists: { _id: req.body.listToRemove }}}, (err, data) => {
    //   if (err){
    //     console.log(err);
    //     res.send(err);
    //   }
    //   res.send(data);
    // }
//   );
};