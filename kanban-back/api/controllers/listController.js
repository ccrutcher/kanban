const List = require('../models/listModel');

exports.list_all_lists = (req, res) => {
  console.log(req.body);
  List.find({}, function(err, list) {
    if (err)
      res.send(err);
    res.json(list);
  });
};

exports.list_board_lists = function(req, res) {
  List.find({'boardId': req.params.boardId},{_id:0, __v:0}, function(err, board) {
    if (err)
      res.send(err);
    res.json(board);
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