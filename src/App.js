import React, { Component } from 'react';
import Form from './Form.jsx';
import './css/app.css';

/*
  Немного бессмысленный компонент. Но мне кажется, что заголовок,
  не относится к форме.
 */
class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>Form Validation Example</h1>
        <Form />
      </div>
    );
  }
}

export default App;
