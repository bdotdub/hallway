var untappd = require('./lib.js');

exports.sync = function(pi, cb) {
  var resp = {data : {}};
  var contacts = resp.data['contact:'+pi.auth.pid+'/friends'] = [];
  untappd.getFriends(pi, {}, function(item){
    contacts.push(item)
  }, function(err) {
    cb(err, resp);
  });
}

