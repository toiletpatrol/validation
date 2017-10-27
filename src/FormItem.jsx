import React, { Component } from 'react';
import './css/form-item.css';

/*
  Компонент оборачивает полученный элемент формы,
  при наличии показывает ошибки и добавляет лейбл
 */
export default class FormItem extends Component {
  render() {
    let errors = this.props.errors.map((v, i) => <p className="form-item__error" key={`error-${i}`}>{v}</p>);
    let label = this.props.label ? (<label htmlFor="fullname">{this.props.label}</label>) : null;

    return (
      <div className={`form-item${this.props.errors.length ? ' form-item_error' : ''}`}>
        {label}
        {this.props.children}
        {errors}
      </div>
    );
  }
}
