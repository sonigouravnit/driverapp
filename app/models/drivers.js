/**
 * Created by Gourav on 04/02/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var counter = require('./counter');

var DriverSchema = new Schema({
    id: { type: Number, required: true },
    isAvailable: Boolean
  },
  {collection: 'drivers'});

var DriverModel = mongoose.model('drivers', DriverSchema);

exports.create = function(cb){
  counter.getNewDriverId(function (err , id) {
    if(err){
      cb(err, null);
    }else {
      var driver = new DriverModel({id: id, isAvailable: true});

      driver.save(function (err) {
        if(err){
          cb(err, null);
        }else {
          cb(null, '');
        }
      });
    }
  });
};

exports.isAvailable = function (id , cb) {
  DriverModel.findOne({id: id, isAvailable: true}, function (err, driver) {
    if (err) {
      cb(err, null);
    }else {
      cb(null, driver);
    }
  });
};

exports.updateStatus = function (id, status, cb) {
  DriverModel.updateOne({id: id},{isAvailable: status},{upsert: 1}, function (err, driver) {
    if (err) {
      cb(err, null);
    }else {
      cb(null, driver);
    }
  });
};

exports.removeAll = function (cb) {
  DriverModel.remove({}, function (err, success) {
    if(err){
      cb(err, null);
    }else {
      cb(null, success);
    }
  });
};
