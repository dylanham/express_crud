var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Classroom = mongoose.model('Classroom');

router.get('/', function(req, res) {
  Classroom.find({}, function(err, classrooms) {
    if (err) console.log(err);
    res.render('classrooms/index', {classrooms: classrooms})
  });
});

router.get('/new', function(req, res){
  res.render('classrooms/new')
})

router.get('/:id', function(req, res){
  Classroom.findOne({_id: req.params.id}, function(err, classroom) {
    res.render('classrooms/show', {classroom: classroom});
  });
});

router.post('/new', function(req, res){
  var classroom = new Classroom(req.body)

  classroom.save(function(err){
    if (err){
      res.render('classrooms/new')
    } else {
      res.redirect('/classrooms')
    }
  })
})

router.get('/:id/edit', function(req, res){
  Classroom.findOne({_id: req.params.id}, function(err, classroom){
    res.render('classrooms/edit', {classroom: classroom})
  })
})

router.post('/:id/edit', function(req, res){
  var query = {"_id": req.params.id};
  var update = req.body;
  var options = {upsert: true};
  Classroom.findOneAndUpdate(query, update, options, function(err, person) {
    if (err) {
      console.log('got an error');
      res.redirect('/classrooms/' +req.params.id+ '/edit')
    } else {
      res.redirect('/classrooms/' + req.params.id)
    }
  });
})

router.post('/:id/delete', function(req, res){
  Classroom.findByIdAndRemove(req.params.id, function(err){
    if (err) {console.log(err)}
  })
  res.redirect('/classrooms')
})

module.exports = router;
