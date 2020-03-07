const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', (error, client) => {
  if (error) {
  console.log('Connection error')
  }
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`we're connected!!!`);
});

let githubRepoSchema = mongoose.Schema({
  // TODO: your schema here!
  userName: String,
  avatar_url: String,
  repo: String,
  html_url: {
    type: String,
    unique: true
  },
  stargazers_count: Number
});

let githubRepo = mongoose.model('githubRepoSchema', githubRepoSchema);

let create = (object) => {
  githubRepo.create(object, (err, success) => {
    if (err) {
      console.log('there was a problem with creating a new document. Error message:', err);
    } else {
      console.log('successfully create new document. Success message:', success);
    }
  })
}

let save = (dataArray) => {
  // Repo.find({}).exec((err, data) => {console.log(data)});
  // Repo.deleteMany({}, (error, success)=> {error ? console.log('error:', error) : console.log('success:', success)});
  for (var i = 0; i < dataArray.length; i++) {
    create(dataArray[i]);
  }
}

let findReposWithUsername = (callback) => {
  githubRepo.find({}, (err, data) => {
    if (err) {
      console.log(`error in finding repos with given userName ${userName}. The error message is: ${err}`);
      callback(err, null);
    } else {
      callback(null, data);
    }
  })
}

module.exports.save = save;
module.exports.findReposWithUsername = findReposWithUsername;