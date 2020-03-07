const express = require('express');
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github').getReposByUsername;
const save = require('../database/index').save;
const findReposWithUsername = require('../database/index').findReposWithUsername;

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  getReposByUsername(req.body.query, (err, result) => {
    if (err) {
      console.log('In server index.js, running post request gives error:', err);
    } else {
      res.sendStatus(200);
    }
    let responseFromGithub = JSON.parse(result.body);
    let dataArrayToSaveToDatabase = [];
    for (var i = 0; i < responseFromGithub.length; i++) {
      let dataObject = {};
      dataObject.userName = responseFromGithub[i].owner.login;
      dataObject.avatar_url = responseFromGithub[i].owner.avatar_url;
      dataObject.repo = responseFromGithub[i].name
      dataObject.html_url = responseFromGithub[i].html_url;
      dataObject.stargazers_count = responseFromGithub[i].stargazers_count;
      dataArrayToSaveToDatabase.push(dataObject);
    }
    save(dataArrayToSaveToDatabase);
  })


});

app.get('/repos', function (req, res) {
  findReposWithUsername((error, result) => {
    if (error) {
      console.log(`Error in server's get request: ${error}`);
      res.status(400).send(error);
    } else {
      let sortedResult = result.sort((a, b) => {
        return b.stargazers_count - a.stargazers_count;
      });
      let top25 = sortedResult.slice(0, 25);
      res.send(JSON.stringify(top25));
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

