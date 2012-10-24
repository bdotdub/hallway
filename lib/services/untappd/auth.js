module.exports = {
    endPoint : "http://untappd.com/oauth/authorize/",
    grantType : "authorization_code",
    handler : {oauth2 : 'POST'},
    authUrl : "http://untappd.com/oauth/authenticate/?response_type=code"
}
