const List = require('../models/listModel');
const Board = require('../models/boardModel');

exports.list_all_lists = (req, res) => {
  List.find({'boardId': req.params.boardId}, function(err, list) {
    if (err)
      res.send(err);
    res.json(list);
  });
};

exports.create_a_list = function(req, res) {
  let new_list = new List(req.body);
  new_list.save(function(err, list) {
    if (err)
      res.send(err);
    res.json(list);
  });
};


/*
exports.read_a_board = function(req, res) {
  Board.find({'id': req.params.boardId}, function(err, board) {
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
    id: req.params.boardId
  }, function(err, board) {
    if (err)
      res.send(err);
    res.json({ message: 'Board successfully deleted' });
  });
};
*/