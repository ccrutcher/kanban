const Board = require('../models/boardModel');

exports.list_all_boards = (req, res) => {
  Board.find({},{_id:0, __v:0}, function(err, board) {
    if (err)
      res.send(err);
    res.json(board);
  });
};


exports.create_a_board = function(req, res) {
  let new_board = new Board(req.body);
  new_board.save(function(err, board) {
    if (err)
      res.send(err);
    res.json(board);
  });
};


exports.read_a_board = function(req, res) {
  Board.find({'id': req.params.boardId},{_id:0, __v:0}, function(err, board) {
    if (err)
      res.send(err);
    res.json(board);
  });
};

/*
exports.update_a_board = function(req, res) {
  Board.findOneAndUpdate({_id: req.params.boardId}, req.body, {new: true}, function(err, board) {
    if (err)
      res.send(err);
    res.json(board);
  });
};
*/

exports.delete_a_board = function(req, res) {
  Board.remove({
    id: req.params.boardId
  }, function(err, board) {
    if (err)
      res.send(err);
    res.json({ message: 'Board successfully deleted' });
  });
};