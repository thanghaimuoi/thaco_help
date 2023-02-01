import React, { Component } from 'react';
import Service from './services/service';
import HomePage from './compoments/homepage';
import MainEditor from './compoments/editor/main_editor';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from "react-dom/client";

class App extends Component {
  state = { 
    isLoginIn: false,
    user: null
  } 

  componentDidMount() {
    Service.getCurrentUser().then((user) => {
      this.setState({isLoginIn: true, user});
    }).catch(ex => {
      this.setState({isLoginIn: false});
    });
  }

  loginSuccess = (user) => {
    this.setState({isLoginIn: true, user});
  }

  render() { 
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit" element={<MainEditor />} />
      </Routes>
    </BrowserRouter>
    );
  }
}
 
export default App;