var ClientOAuth2 = require('client-oauth2')
var popsicle = require('popsicle')
var username = 'tmpplayer'
var password = 'VahLie5p'
var cid = 'ZCrXi4289wM2OwUuMN85Ev2omjovAVQaAeLcOraX'
var csec = 'ARJAk0Y2dvqtuRNoC05nY5V6YuKQJD1tDy9dMNrOF3oCHFcnAe5MBaOIfh8HUUN66BRzhhzCgKpvoa6Azg3X9sdr5cOaIX5KvqebX5VrN999QZRlSw6Hth1qkkiTtVUa'
var host = 'http://localhost:9900'
var base = `${host}/accounts/oauth2`
var endpoint = `${host}/accounts/api/player/me/`

function me (token) {
  popsicle.request(token.sign({
    method: 'get',
    url: endpoint
  })).then(function (res) {
    console.log(token.accessToken, res.body)
  })
}

var server = new ClientOAuth2({
  clientId: cid,
  clientSecret: csec,
  accessTokenUri: `${base}/token/`,
  authorizationUri: `${base}/authorize/`,
  redirectUri: '',
  scopes: ['read', 'write']
})

// ROPC Flow
server.owner.getToken(username, password)
  .then(function (created) {
    me(created)
    created.refresh().then(function (updatedUser) {
      var refreshed = server.createToken(updatedUser.accessToken)
      me(refreshed)
    })
  })
