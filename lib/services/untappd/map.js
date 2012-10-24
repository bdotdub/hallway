exports.ptype = 105; // must be unique per service, see dMap.js

exports.contact = {
  name: function(data) { return data.user.first_name + ' ' + data.user.last_name; }
  photo: function(data) { return data.user.user_avatar; }
  nickname: function(data) { return data.user.user_name; }
  oembed: function(data) {
    var ret = {type:'contact'};
    ret.url = 'http://untappd.com/user/' + data.user.user_name;
    ret.title = data.user.first_name + ' ' + data.user.last_name;
    if(data.user.bio && data.user.bio.length > 0) ret.description = data.user.bio;
    ret.thumbnail_url = data.user.user_avatar;
    ret.provider_name = 'untappd';
    ret.handle = data.user.user_name;
    ret.id = data.id;
    return ret;
  },
  text: function(data) { return data.user.user_name; }
};

exports.beercheckin = {
  at: function(data) { return new Date(Date.parse(data.created_at)); },
  id: 'checkin_id'
}

exports.checkin = {
  oembed: function(data) {
    if(!data.venue || !data.venue.venue_id) return undefined;
    var ret = {type:'checkin'};
    ret.lat = data.venue.location.lat;
    ret.lng = data.venue.location.lng;
    ret.title = data.venue.venue_name;
    ret.url = 'http://untappd.com/user/' + data.user.user_name + '/checkin/' + data.checkin_id
    ret.provider_name = 'untappd';
    if(data.user && data.user.first_name) ret.author_name = data.user.first_name + ' ' + data.user.last_name;
    return ret;
  }
}

exports.defaults = {
  friends: 'contact',
  feed: 'event',
  checkins: 'event',
  self: 'contact'
}

exports.types = {
  contacts: ['contact:untappd/friends'],
  checkins: ['checkin:untappd/checkins'],
  checkins_feed: ['checkin:untappd/feed']
}
