import React, { Component } from 'react';
import './App.css';

let validatePhone = function(string) {
  let errors = [];
  let re = /^\+\d{11}$/gi;

  if (!re.test(string.replace(/\s/gi, '').replace(/-/gi, ''))) {
    errors.push(`Only digits, spaces, '-' and '+' signs are allowed. Number should contain 11 digits. Example: +7 999 123-45-67`);
  }

  return errors;
};

let validateEmail = function(string) {
  let errors = [];
  let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;



  console.log(re.test(string));

  if (!re.test(string)) {
    errors.push(`Check email. Example: test@mail.ru`);
  }

  return errors;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);

    this.state = {
      phone: '+7 926 258-22-26',
      phoneErrors: [],

      email: 'paperpepper@gmail.com',
      emailErrors: []
    };
  }

  handlePhoneChange(event) {
    this.setState({
      phone: event.target.value,
      phoneErrors: []
    });
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
      emailErrors: []
    });
  }

  handleSubmit() {
    this.setState({
      phoneErrors: validatePhone(this.state.phone),
      emailErrors: validateEmail(this.state.email),
    });
  }

  render() {
    return (
      <div className="App">
        <div className="form">
          <div className="form__item">
            <label htmlFor="fullname">Full Name</label>
            <input id="fullname" type="text" name="fullname" placeholder="Vasiliy Mamaevskiy" defaultValue="Vasiliy" />
          </div>
          <FormItem errors={this.state.emailErrors}>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" name="email" placeholder="test@mail.ru" defaultValue={this.state.email} onChange={this.handleEmailChange} />
          </FormItem>
          <FormItem errors={this.state.phoneErrors}>
            <label htmlFor="phone">Phone</label>
            <input id="phone" type="text" name="phone" placeholder="+7 926 258-22-26" defaultValue={this.state.phone} onChange={this.handlePhoneChange} />
          </FormItem>

          <div className="form__item">
            <label htmlFor="skills">Skills</label>
            <select name="skills" id="skills" defaultValue="middle">
              <option value="senior">Senior</option>
              <option value="middle">Middle</option>
              <option value="junior">Junior</option>
              <option value="asshole">Asshole</option>
            </select>
          </div>

          <div className="form__item form__item_submit">
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

class FormItem extends Component {
  render() {
    let errors = this.props.errors.map((v, i) => <p className="error" key={`error-${i}`}>{v}</p>);

    return (
      <div className={`form__item${this.props.errors.length ? ' form__item_error' : ''}`}>
        {this.props.children}
        {errors}
      </div>
    );
  }
}

export default App;
