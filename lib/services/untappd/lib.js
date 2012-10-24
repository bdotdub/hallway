var request = require('request');
var async = require('async');
var url = require('url');

var base = "http://api.untappd.com/v4/";

exports.getSelf = function(pi, cbEach, cbDone) {
  var arg = {};
  arg.access_token = pi.auth.token && pi.auth.token.access_token;
  arg.path = '/user/info';
  getOne(arg, function(err, self){
    if(err || !self || !self.id) return cbDone(err);
    cbEach(self);
    cbDone();
  });
}

exports.getFeed = function(pi, arg, cbEach, cbDone) {
  arg.access_token = pi.auth.token && pi.auth.token.access_token;
  arg.path = '/checkin/recent';
  getPages(arg, "checkins", cbEach, cbDone);
}

exports.getFriends = function(pi, arg, cbEach, cbDone) {
  arg.access_token = pi.auth.token && pi.auth.token.access_token;
  arg.path = '/user/friends';
  getPages(arg, "items", cbEach, cbDone);
}

exports.getCheckins = function(pi, arg, cbEach, cbDone) {
  arg.access_token = pi.auth.token && pi.auth.token.access_token;
  arg.path = '/user/checkins';
  getPages(arg, "checkins", cbEach, cbDone);
}

function getOne(arg, cb) {
  if(!arg || !arg.path) return cb("no path");
  var api = url.parse(base+arg.path);
  delete arg.path;
  api.query = arg;
  request.get({uri:url.format(api), json:true}, function(err, res, body) {
    if(err || !res) return cb(err);
    if(res.statusCode != 200) return cb("status code "+res.statusCode);
    if(!body || !body.meta) return cb("invalid response: "+JSON.stringify(body));
    if(body.meta.code != 200) return cb(JSON.stringify(body.meta));
    cb(null,body.data);
  });
}

function getPages(arg, attribute, cbEach, cbDone) {
  if(!arg) return cbDone("no arg");
  if(!arg.uri)
  {
    if(!arg.path) return cbDone("no uri or path given");
    var api = url.parse(base+arg.path);
    delete arg.path;
    api.query = arg;
    arg.uri = url.format(api);
  }
  request.get({uri:arg.uri, json:true}, function(err, res, body) {
    if(err || !res) return cbDone(err);
    if(res.statusCode != 200) return cbDone("status code "+res.statusCode);
    if(!body || !body.meta) return cbDone("invalid response: "+JSON.stringify(body));
    if(body.meta.code != 200) return cbDone(JSON.stringify(body.meta));
    var since = args.since;
    for(var i = 0; body.response && body.response[attribute] && i < body.response[attribute].length; i++) {
      var responseItem = body.response[attribute][i],
          itemTimestamp = new Date(Date.parse(responseItem.created_at));
      if(since && itemTimestamp < min) min = itemTimestamp;
      cbEach(responseItem);
    }
    if(since && since < arg.since) {
      return cbDone();
    }
    if(body.pagination && body.pagination.next_url && body.pagination.next_url != arg.uri) {
      arg.uri = body.pagination.next_url;
      getPages(arg, cbEach, cbDone);
    } else {
      cbDone();
    }
  });
}


