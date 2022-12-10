import './App.css';
// This is the react class based component
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';

export default class App extends Component {
  render() {
    return (
      <div>
       <Navbar/>
       <News pageSize={5} country="in"/>
      </div>
    )
  }
}
