{
  "name":"Untappd",
  "desc":"Syncs beers, feed, and friends.",
  "key": "CLIENT ID",
  "secret": "CLIENT SECRET",
  "icons": [
    {"height": 16, "width": 16, "source":"http://assets.singly.com/service-icons/16px/untappd.png"},
    {"height": 24, "width": 24, "source":"http://assets.singly.com/service-icons/24px/untappd.png"},
    {"height": 32, "width": 32, "source":"http://assets.singly.com/service-icons/32px/untappd.png"}
  ],
  "synclets":[
      {"name": "self",      "frequency": 86400, "class":"core"},
      {"name": "feed",      "frequency": 600, "class":"social"},
      {"name": "friends",   "frequency": 86400, "class":"core"},
      {"name": "checkins",  "frequency": 3600, "class":"personal"}
  ]
}
