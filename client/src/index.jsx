import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: this.props.repos
    }

  }

  search (data) {
    // TODO
    console.log('new list of top 25 repos from sending a post request:', data);
    this.setState({
      repos: data
    })
  }

  render () {
    console.log('this.state in App:', this.state);
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

$.ajax({
  type: 'get',
  url: 'http://localhost:1128/repos',
  success: (result) => {
    console.dir('result from initial load get request:', JSON.parse(result));
    ReactDOM.render(<App repos={JSON.parse(result)} />, document.getElementById('app'));
  }
})

