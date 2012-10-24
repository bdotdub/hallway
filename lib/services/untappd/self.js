var untappd = require('./lib.js');

exports.sync = function(pi, cb) {
  var self = {};
  untapped.getSelf(pi, function(me) { self = me; }, function(err) {
    pi.auth.profile = self;
    pi.auth.pid = self.id+'@untappd'; // profile id
    var base = 'contact:'+pi.auth.pid+'/self';
    pi.data = {};
    pi.data[base] = [self];
    cb(err, pi);
  });
}
