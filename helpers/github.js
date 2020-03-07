const request = require('request');
const config = require('../config.js');

let getReposByUsername = (githubUserName, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let url = `https://api.github.com/users/${githubUserName}/repos`;
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  // console.log('options:', options);
  request(options, (err, result) => {
    if (err) {
      console.log('In getReposByUsername, request has an error:', err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;