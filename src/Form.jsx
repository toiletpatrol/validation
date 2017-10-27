import React, { Component } from 'react';
import FormItem from './FormItem.jsx';
import validate from './validation.js';
import './css/form.css';

class Form extends Component {
  constructor(props) {
    super(props);

    // Можно биндить на месте, но я предпочитаю делать
    // это в конструкторе. Другие хендлеры пришлось биндить на месте,
    // потому что они общие для разных полей, и там пришлось указывать
    // название поля
    this.handleSubmit = this.handleSubmit.bind(this);

    // Дефолтный стейт
    this.state = {
      data: {
        name: 'Vasiliy Mamaevskiy',
        email: 'paperpepper@gmail.com',
        phone: '+7 926 258-22-26',
        skills: 'middle'
      },

      errors: {
        name: [],
        email: [],
        phone: [],
        skills: []
      },

      status: 'unknown'
    };
  }

  /*
    Обработчик изменения значения какого-либо из полей
   */
  handleFieldChange(field, event) {
    // Копируем стейт
    let newState = JSON.parse(JSON.stringify(this.state));

    // Готовим новый стейт:
    // 1) запоминаем значение поля
    newState.data[field] = event.target.value;

    // 2) сбрасываем ошибки поля (потому что значение поля изменилось,
    // и соответственно результаты валидации больше не имеют смысла)
    newState.errors[field] = [];

    // 3) обнуляем стаус валидации (потому что аналогично п. 2)
    newState.status = 'unknown';

    // Меджим новый стейт со старым
    this.setState(newState);
  }

  /*
    Метод валидирует имеющиеся значения, собирает ошибки,
    пихает их в стейт, возращает:

    `true` если нет ошибок ни в одном поле,
    `false` если есть хотя бы одна ошибка в одном из полей

    TODO: Еще я забыл сделать нормальную проверку на пустые значения, пожалуй,
    я бы вынес ее отдельно куда-то сюда.
   */
  validateForm() {
    let errors = {
      name: validate['name'](this.state.data.name),
      phone: validate['phone'](this.state.data.phone),
      email: validate['email'](this.state.data.email),
      skills: validate['skills'](this.state.data.skills)
    };

    this.setState({errors});

    return ![].concat(errors.name, errors.email, errors.phone, errors.skills).length;
  }

  /*
    Обработчик нопки `Submit`. Вызывает общий валидатор формы,
    меняет состояние стейта и при удачном раскладе выводит
    собранные данные в консоль
   */
  handleSubmit() {
    let isValid = this.validateForm();

    if (isValid) {
      this.setState({status: 'valid'});
      console.log(this.state.data);
    } else {
      this.setState({status: 'invalid'});
    }
  }

  render() {
    let status = null;

    // Это маленький смайлик рядом с кнопкой `submit`
    if (this.state.status !== 'unknown') {
      status = (
        <div className={`form__status form__status_${this.state.status}`}></div>
      );
    }

    return (
      <div className="form">
        <FormItem errors={this.state.errors.name} label="Full Name">
          <input id="fullname" type="text" name="fullname" placeholder="Vasiliy Mamaevskiy" defaultValue={this.state.data.name} onChange={this.handleFieldChange.bind(this, 'name')} />
        </FormItem>

        <FormItem errors={this.state.errors.email} label="Email">
          <input id="email" type="text" name="email" placeholder="test@mail.ru" defaultValue={this.state.data.email} onChange={this.handleFieldChange.bind(this, 'email')} />
        </FormItem>

        <FormItem errors={this.state.errors.phone} label="Phone">
          <input id="phone" type="text" name="phone" placeholder="+7 926 258-22-26" defaultValue={this.state.data.phone} onChange={this.handleFieldChange.bind(this, 'phone')} />
        </FormItem>

        <FormItem errors={this.state.errors.skills} label="Skills">
          <select name="skills" id="skills" defaultValue={this.state.data.skills} onChange={this.handleFieldChange.bind(this, 'skills')}>
            <option value="senior">Senior</option>
            <option value="middle">Middle</option>
            <option value="junior">Junior</option>
            <option value="asshole">Asshole</option>
          </select>
        </FormItem>

        <div className="form-item form-item_submit">
          <button className="form__submit-button" onClick={this.handleSubmit}>Submit</button>
          {status}
        </div>
      </div>
    );
  }
}

export default Form;
