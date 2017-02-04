/**
 * Created by Gourav on 04/02/17.
 */


var requestModel = require('../models/requests'),
  driverModel = require('../models/drivers'),
  step = require('step');


exports.create = function (request, cb) {
  if (request.customerId && request.customerId.length) {
    request.status= "waiting";
    requestModel.create(request, function (err, success) {
      if(err){
        cb(err, null);
      }else{
        cb(null, success);
      }
    });
  }
};

exports.assignDriverToRequest = function (request, cb) {
  request.status = "ongoing";
  request.ongoingTime = new Date();

  new step(
    function checkAvail(){
      requestModel.isAvailable(request, this.parallel());
      driverModel.isAvailable(request.driver, this.parallel());
    },
    function setp2(err, reqAvail, driverAvail) {
      if(err){
        cb(err, null);
      }else  if(null == reqAvail ){
        cb("request no longer available", null);

      }else  if(null == driverAvail){
        cb("You can pick 1 Ride at a time.", null);
      }
      else{
        requestModel.update(request, this.parallel());
      }
    },
    function step3(err, success) {
      if (err) {
        cb(err, null);
      } else {
        driverModel.updateStatus(request.driver, false, this.parallel());
      }
    },
    function step4(err, success) {
      if(err){
        cb(err, null);
      }else{
        setTimeout(function() {
          completeARide(request);
        }, 1000*60*5);
        cb(null, success);
      }
    });
};

exports.getRequestForDriver = function (driver , cb) {
  requestModel.findByDriver(parseInt(driver), cb);
};

exports.getAllRequest = function (cb) {
  requestModel.findAll(cb);
};

function completeARide(request) {
  request.status = "complete";
  request.completeTime = new Date();

  requestModel.update(request, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      driverModel.updateStatus(request.driver, true, function (err, success) {
        if(err){
          console.log(err);
        }
      });
    }
  });
}
