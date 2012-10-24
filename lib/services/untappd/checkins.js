var untappd = require('./lib.js');

exports.sync = function(pi, cb) {
  pi.data = {};
  var base = 'beercheckin:'+pi.auth.pid+'/checkins';
  var checkins = pi.data[base] = [];
  var arg = {};
  if(pi.config.checkinSince) arg.since = pi.config.checkinSince;
  untappd.getFeed(pi, arg, function(checkin){
    checkins.push(checkin);
    var checkinAt = new Date(Date.parse(checkin.created_at));
    if(checkinAt > (pi.config.checkinSince||0)) pi.config.checkinSince = checkinAt;
  }, function(err) {
    cb(err, pi);
  });
}
