import React, { Component } from "react";
import FormItem from "./FormItem";
import validate from "./validation";
import "./css/form.css";

const CLEAR_STATE = {
  data: {
    name: "",
    email: "",
    phone: "",
    skills: "middle"
  },

  errors: {
    name: [],
    email: [],
    phone: [],
    skills: []
  },

  status: "unknown"
};

/**
 * Кастомная форма, не какая-нибудь общая, просто названия
 * получше не придумал
 */
class Form extends Component {
  state = CLEAR_STATE;

  /**
   * Обработчик изменения значения какого-либо из полей
   */
  handleFieldChange = (event) => {
    const { target: { name, value } } = event;
    const { data: srcData, errors: srcErrors } = this.state;

    const data = { ...srcData };
    const errors = { ...srcErrors };

    /** Обновляем data для нового стейта: */
    data[name] = value;

    /**
     * Cбрасываем ошибки поля (потому что значение поля изменилось,
     * и соответственно результаты валидации больше не имеют смысла).
     * По этой же причине сбрасываем стаус валидации
     */
    errors[name] = [];

    this.setState({
      data,
      errors,
      status: "unknown"
    });
  };

  /**
   * Метод валидирует имеющиеся значения, собирает ошибки,
   * отправляет их в стейт, а также обновляет status:
   */
  validateForm = () => {
    const { data } = this.state;
    const errors = {};
    let status = "valid";

    Object.keys(data).forEach((field) => {
      const value = data[field];
      errors[field] = validate[field](value);

      if (Boolean(errors[field].length)) {
        status = "invalid";
      }
    });

    this.setState({ errors, status });
  };

  /**
   * Обработчик кнопки `Submit`. Вызывает валидатор формы
   */
  handleSubmit = (e) => {
    e.preventDefault();
    this.validateForm();
  };

  /**
   * Обработчик кнопки `Reset`. Сбрасывает форму
   */
  handleReset = (e) => {
    e.preventDefault();
    this.setState(CLEAR_STATE);
  };

  render() {
    const {data, errors, status } = this.state;
    const showSmiley = status !== "unknown";

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <FormItem errors={errors.name} label="Full Name">
          <input
            id="name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={data.name}
            onChange={this.handleFieldChange}
          />
        </FormItem>

        <FormItem errors={errors.email} label="Email">
          <input
            id="email"
            type="text"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.handleFieldChange}
          />
        </FormItem>

        <FormItem errors={errors.phone} label="Phone">
          <input
            id="phone"
            type="text"
            name="phone"
            placeholder="+7 XXX XXX-XX-XX"
            value={data.phone}
            onChange={this.handleFieldChange}
          />
        </FormItem>

        <FormItem errors={errors.skills} label="Skills">
          <select
            name="skills"
            id="skills"
            value={data.skills}
            onChange={this.handleFieldChange}
          >
            <option value="senior">Senior</option>
            <option value="middle">Middle</option>
            <option value="junior">Junior</option>
            <option value="idk">I don't know</option>
          </select>
        </FormItem>

        {/** Кнопки */}
        <div className="form-item form-item_submit">
          {/** Кнока `Submit` */}
          <button
            className="form__submit-button"
            onClick={this.handleSubmit}
          >
            Submit
          </button>

          {/** Маленький смайлик рядом с кнопкой - результат валидации */}
          {showSmiley && (
            <div className={`form__status form__status_${status}`} />
          )}

          {/** Кнопка `Reset` */}
          <button
            className="form__reset-button"
            onClick={this.handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    );
  }
}

export default Form;
