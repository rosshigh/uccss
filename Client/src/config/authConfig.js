
var authConfig = {

  // Our Node API is being served from localhost:3001
  baseUrl: "",
  // The API specifies that new users register at the POST api/people enpoint
  signupUrl: 'api/people/register',
  // Logins happen at the POST api/people/login endpoint
  loginUrl: 'login',
  // The API serves its tokens with a key of id which differs from
  // aureliauth's standard
  tokenName: 'token',
  authHeader: 'Authorization',
  authToken: 'Bearer',
  // Once logged in, we want to redirect the user to the welcome view
  //loginRedirect: '#/reroute'
//   loginRedirect: '#/redirect'
  logoutRedirect: '#/home'
}

export default authConfig;