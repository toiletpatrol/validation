import React, { PureComponent } from "react";
import Form from "./Form";
import "./css/app.css";

/*
 * App - всему голова
 */
class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <h1>Form Validation</h1>
        <Form />
      </div>
    );
  }
}

export default App;
