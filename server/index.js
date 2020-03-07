const express = require('express');
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github').getReposByUsername;
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  getReposByUsername(req.body.query, (err, result) => {
    if (err) {
      console.log('In server index.js, running post request gives error:', err);
    } else {
      console.log('result from searching github:', JSON.parse(result.body));
      res.sendStatus(200);
    }
    // save the repo information in the database
    let responseFromGithub = JSON.parse(result.body);
    let dataToStoreInDatabase = {};
    dataToStoreInDatabase.name = responseFromGithub[0].owner.login;
    dataToStoreInDatabase.avatar_url = responseFromGithub[0].owner.avatar_url;
    dataToStoreInDatabase.repos_url = responseFromGithub[0].owner.repos_url;
    dataToStoreInDatabase.forks = responseFromGithub[0].forks;
    console.log('dataToStoreInDatabase:', dataToStoreInDatabase);
  })


});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('in index.js get request received');
  res.end(JSON.stringify(['hello']));
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

