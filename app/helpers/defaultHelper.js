/**
 * Created by Gourav on 04/02/17.
 */

var Step = require('step');
var DriverModel = require('../models/drivers');
var CounterModel = require('../models/counter');

exports.generateDefaultData = function (cb) {
  new Step(
    function clearCounterData() {
      CounterModel.clearData(this.parallel());
    },
    function clearData(err, data) {
      if(err){
        cb(err, null);
      }else {
        DriverModel.removeAll(this.parallel());
      }
    },
    function generateData(err, drivers) {
      if(err){
        cb(err, null);
      }else {
        generateDriver(5, 0, this.parallel());
      }
    },
    function result(err, drivers) {
      if(err){
        cb(err, null);
      }else {
        cb(null, '');
      }
    });
};


function generateDriver(max , current, cb) {
 if(max > current){
  DriverModel.create(function (err, success) {
    if(err) {
      cb(err, null);
    } else {
      generateDriver(max, ++current, cb);
    }
  });
 }else {
   cb(null, '');
 }
}
