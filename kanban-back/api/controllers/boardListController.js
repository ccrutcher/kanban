const Board = require('../models/boardModel');


exports.list_all_boards = (req, res) => {
  Board.find({}, function(err, board) {
    if (err)
      res.send(err);
    res.json(board);
  });
};

/*
exports.create_a_board = function(req, res) {
  var new_board = new Board(req.body);
  new_board.save(function(err, board) {
    if (err)
      res.send(err);
    res.json(board);
  });
};


exports.read_a_board = function(req, res) {
  Board.findById(req.params.boardId, function(err, board) {
    if (err)
      res.send(err);
    res.json(board);
  });
};


exports.update_a_board = function(req, res) {
  Board.findOneAndUpdate({_id: req.params.boardId}, req.body, {new: true}, function(err, board) {
    if (err)
      res.send(err);
    res.json(board);
  });
};


exports.delete_a_board = function(req, res) {
  Board.remove({
    _id: req.params.boardId
  }, function(err, board) {
    if (err)
      res.send(err);
    res.json({ message: 'Board successfully deleted' });
  });
};
*/