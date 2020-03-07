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
    this.setState({
      repos: data
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

$.ajax({
  type: 'get',
  url: 'http://localhost:1128/repos',
  success: (result) => {
    ReactDOM.render(<App repos={JSON.parse(result)} />, document.getElementById('app'));
  }
})

