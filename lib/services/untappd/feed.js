var untappd = require('./lib.js');

exports.sync = function(pi, cb) {
  pi.data = {};
  var base = 'beercheckin:'+pi.auth.pid+'/feed';
  var checkins = pi.data[base] = [];
  var arg = {};
  if(pi.config.feedSince) arg.since = pi.config.feedSince;
  untappd.getFeed(pi, arg, function(checkin){
    checkins.push(checkin);
    var checkinAt = new Date(Date.parse(checkin.created_at));
    if(checkinAt > (pi.config.feedSince||0)) pi.config.feedSince = checkinAt;
  }, function(err) {
    cb(err, pi);
  });
}
