import React from "react";
import "./css/form-item.css";

/**
 * Компонент оборачивает полученный элемент формы,
 * при наличии показывает ошибки и добавляет лейбл
 */
export const FormItem = (props) => {
  const { label, errors, children } = props;
  const className = `form-item${errors.length ? " form-item_error" : ""}`;


  return (
    <div className={className}>
      {/** Лейбл */}
      {Boolean(label) && (<label htmlFor="name">{label}</label>)}

      {children}

      {/** Ошибки */}
      {Boolean(errors.length) && errors.map((v, i) => {
        return (<p className="form-item__error" key={i}>{v}</p>);
      })}
    </div>
  );
};

export default FormItem;
