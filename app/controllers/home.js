var express = require('express'),
  router = express.Router(),
  defaultHelper = require('../helpers/defaultHelper'),
  hbw = require('./../helpers/hbswidgets'),
  apiHelper = require('../helpers/apiHelper');

router.indexPage = function (req, res, next) {
  res.render('index', {
    title: 'Docapp Ride bookingg'
  });
};

router.driverPage = function (req, res, next) {

  apiHelper.getRequestForDriver(req.params.id, function (err, list) {
    var data = [];
    if (err) {

    } else {
      for(var i in list){
        data[list[i]._id] = list[i].requests;
      }
    }
    res.render('drivers', {
      helpers: hbw,
      results: data,
      driverId: req.params.id
    });
  });

};

router.customerPage = function (req, res, next) {
  res.render('customer', {
    helpers: hbw
  });
};

router.requestPage = function (req, res, next) {
  apiHelper.getAllRequest(function (err, success) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render('dashboard', {
        helpers: hbw,
        requests: success
      });
    }
  });
};

router.generateData = function (req, res, next) {
  defaultHelper.generateDefaultData(function (err, success) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(success);
    }
  });
};

router.newRequest = function (req, res, next) {
  apiHelper.create(req.body, function (err, success) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(success);
    }
  });
};

router.assignRequest = function (req, res, next) {
  apiHelper.assignDriverToRequest(req.body, function (err, success) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(success);
    }
  });
};

module.exports = function (app) {
  app.use('/api/generateData', router.generateData);
  app.use('/api/newRequest', router.newRequest);
  app.use('/api/assignRequest', router.assignRequest);
  app.use('/driver/:id', router.driverPage);
  app.use('/customer', router.customerPage);
  app.use('/dashboard', router.requestPage);
  app.use('/', router.indexPage);
};
