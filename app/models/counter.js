/**
 * Created by Gourav on 04/02/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = Schema({
  _id: {type: String, required: true},
  driverCount: { type: Number, default: 0 },
  requestCount: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

exports.getNewDriverId = function (cb) {

  counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { driverCount: 1} },{new: true, upsert: true}, function(error, counter)   {
    if(error) {
      console.log("i am here "+ counter);
      cb(error, null);
    }
    else {
      cb(null, counter.driverCount);
    }
  });

};

exports.getNewRequestId = function (cb) {

  counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { requestCount: 1} }, function(error, counter)   {
    if(error) {
      cb(error, null);
    }
    else {
      cb(null, counter.requestCount);
    }
  });
};

exports.clearData = function (cb) {
  counter.remove({},function (err) {
    if(err){
      cb(err, null);
    }else {
      cb(null, null);
    }
  });
};
