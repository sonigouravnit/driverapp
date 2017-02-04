
var hbw = {};

hbw.timeDiff = function (b) {
	return parseInt((new Date().getTime()-new Date(b).getTime())/(1000*60));
};

hbw.timeElapsed =function (b) {
  var time = parseInt((new Date().getTime()-new Date(b).getTime())/(1000));
  var mins = parseInt(time / 60);
  var second = time %60;
  return mins + " mins " + second + " seconds";
};

module.exports = hbw;
