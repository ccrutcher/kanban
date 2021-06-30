const Board = require('../models/boardModel');

exports.list_all_boards = (req, res) => {
  Board.find({},{_id:0, __v:0}, function(err, board) {
    if (err)
      res.send(err);
    res.json(board);
  });
};


const randomNumber = (min = 100000000, max = 999999999) => { 
  return Math.floor(Math.random() * (max - min) + min);
}

exports.create_a_board = function(req, res) {
  let newAttempt = randomNumber();
  let board_details = {id: newAttempt}
  let new_board = new Board(board_details);
  console.log(new_board);
  new_board.save(function(err, board) {
    if (err){
      console.log("Something went wrong while creating a board.");
      console.log(err)
      res.send(err);
    }
    res.json(board);
  });
};

exports.delete_a_board = function(req, res) {
  Board.remove({
    id: req.params.boardId
  }, function(err, board) {
    if (err)
      res.send(err);
    res.json({ message: 'Board successfully deleted' });
  });
};