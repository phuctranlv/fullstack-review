const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', (error, client) => {
  if (error) {
  console.log('Connection error')
  }
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(`we're connected!!!`);
});

let repoSchema = mongoose.Schema({
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

let Repo = mongoose.model('Repo', repoSchema);

let create = (object) => {
  Repo.create(object, (err, success) => {
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
  console.log(`before the loop in database...`)
  for (var i = 0; i < dataArray.length; i++) {
    create(dataArray[i]);
  }
}

module.exports.save = save;