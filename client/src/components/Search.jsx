import React from 'react';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search(e) {
    $.ajax({
      type: 'post',
      url: 'http://localhost:1128/repos',
      data: {query: this.state.term},
      success: (data) => {
        $.ajax({
          type: 'get',
          url: 'http://localhost:1128/repos',
          success: (result) => {
            this.props.onSearch(JSON.parse(result));
          }
        })
      }
    })
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.terms} onChange={this.onChange}/>
      <button onClick={this.search}> Add Repos </button>
    </div>)
  }
}

export default Search;