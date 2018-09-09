import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {

  state = {
    response: []
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/comments');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">/r/startups wants</h1>
        </header>
        <div className="App-intro" style={{textAlign: 'left'}}>
          {
            this.state.response.map((comment) => {
              let words = comment.split(' ');

              let indexWant = words.indexOf('want');
              let indexNeed = words.indexOf('need');

              if (indexWant >= 0 && indexNeed >= 0) {
                if (indexWant <= indexNeed) {
                  return (
                    <li key={comment} style={{margin: 10}}>
                      {words.slice(0, indexWant - 2).join(' ')}
                      <span style={{color: 'red'}}>{words.slice(indexWant - 2, indexWant + 4).join(' ')}</span>
                      {words.slice(indexWant + 4, words.length).join(' ')}
                    </li>
                  )
                }
                else {
                  return (
                    <li key={comment} style={{margin: 10}}>
                      {words.slice(0, indexNeed - 2).join(' ')}
                      <span style={{color: 'red'}}>{words.slice(indexNeed - 2, indexNeed + 4).join(' ')}</span>
                      {words.slice(indexNeed + 4, words.length).join(' ')}
                    </li>
                  )
                }
              }
              else if (indexWant >= 0 && indexNeed <= 0) {
                return (
                  <li key={comment} style={{margin: 10}}>
                    {words.slice(0, indexWant - 2).join(' ')}
                    <span style={{color: 'red'}}>{' ' + words.slice(indexWant - 2, indexWant + 4).join(' ') + ' '}</span>
                    {words.slice(indexWant + 4, words.length).join(' ')}
                  </li>
                )
              }
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
