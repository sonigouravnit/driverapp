/**
 * Created by Gourav on 04/02/17.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var counter = require('./counter');
var step = require('step');


var RequestSchema = new Schema({
    id: {type: Number, required: true},
    driver: Number,
    customerId: Number,
    status: String,
    ongoingTime: Date,
    completeTime: Date
  },
  {
    collection: 'requests',
    timestamps: true
  });

var RequestModel = mongoose.model('requests', RequestSchema);


exports.create = function (req, cb) {

  console.log(req);
  new step(
    function getNewId() {
      counter.getNewRequestId(this.parallel());
    },
    function save(err, id) {
      if (err) {
        cb(err, null);
      } else {
        console.log(req);
        var request = new RequestModel(req);
        request.id = id;
        request.save(this.parallel());
      }
    },
    function result(err, data) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, '');
      }
    }
  );
  /*
   counter.getNewRequestId(function (err, id) {
   if (err) {
   cb(err, null);
   } else {

   var request = new RequestModel(request);
   request.id = id;

   request.save(function (err) {
   if (err) {
   cb(err, null);
   } else {
   cb(null, '');
   }
   });
   }
   });*/
};


exports.update = function (request, cb) {
  RequestModel.update({id: request.id}, request, {upsert: 1}, function (err, success) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, success);
    }
  });
};

exports.isAvailable = function (request, cb) {
  RequestModel.findOne({id: request.id, status: 'waiting'}, function (err, success) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, success);
    }
  });
};

exports.findByDriver = function (driver, cb) {
  if (driver > 0 && driver <= 5) {

    RequestModel.aggregate([
      {
        $match: {
          $or: [{driver: driver}, {status: 'waiting'}]
        }
      },
      {
        $group: {
          _id: "$status",
          requests: {$push: "$$ROOT"}
        }
      }
    ], function (err, result) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, result);
      }
    });
  } else {
    cb('Driver does not exist', null);
  }
};

exports.findAll = function (cb) {
  RequestModel.find({}, function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

