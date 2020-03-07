import React from 'react';

const Repo = (props) => (
  <div className="repo">
    <div className="repo-user">Username: {props.repo.userName}</div>
    <div className="repo-name">Repo name: {props.repo.repo}</div>
    <div className="repo-url">Repo url: {props.repo.html_url}</div>
    <div className="repo-star">Repo star: {props.repo.stargazers_count}</div>
  </div>
)

export default Repo;