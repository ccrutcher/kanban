const Board = require('../models/boardModel');

//Get all boards
exports.list_all_boards = (req, res) => {
  Board.find({}, { _id: 0, __v: 0 }, function (err, board) {
    if (err)
      res.send(err);
    res.json(board);
  });
};

//Get a specific board
exports.get_board = function (req, res) {
  Board.find({ 'boardID': req.params.boardId }, function (err, board) {
    if (err) {
      res.send(err);
    } else {
      if (board.length === 0) {
        res.json({ undefined });
      } else {
        res.json(board);
      }
    }
  })
};

const randomNumber = (min = 100000000, max = 999999999) => {
  return Math.floor(Math.random() * (max - min) + min);
}

//Create a new board with a random 9 digit room ID
exports.create_a_board = async function (req, res) {
  let boardNumInUse = true;
  let newAttempt;

  //Make sure room ID is not in use
  while (boardNumInUse) {
    newAttempt = randomNumber();
    await Board.find({ 'boardID': newAttempt }, function (err, board) {
      if (board.length === 0) {
        boardNumInUse = false;
      }
    })
  }

  let board_details = { boardID: newAttempt };
  let new_board = new Board(board_details);
  new_board.save(function (err, board) {
    if (err) {
      res.send(err);
    }
    res.json(board);
  });
};

//Delete a specific board
exports.delete_a_board = function (req, res) {
  Board.deleteOne({
    _id: req.body.boardID
  }, function (err, board) {
    if (err)
      res.send(err);
    res.json({ message: 'Board successfully deleted' });
  });
};