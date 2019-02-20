/**
 * Валидация имени
 */
let validateName = function(string) {
  let errors = [];

  if (string === "") {
    errors.push("Please enter your name");
  }

  /**
   * Здесь я выкидываю из строки все латинские буквы и пробелы,
   * и смотрю осталось ли что-то в строке. Если да, то строка не валидна.
   * Возможно, не самый очевидный способ, но точно проще, чем любая другая
   * регулярка.
   */
  if (string.replace(/\s/g, "").replace(/[a-z]/gi, "")) {
    errors.push("Only latin letters are allowed. Example: John Doe");
  }

  return errors;
};

/**
 * Валидация телефонного номера (здесь - только российского)
 */
let validatePhoneNumber = function(string) {
  let errors = [];
  let re = /^\+7\d{10}$/gi;

  /**
   * Я разрешаю пользователям использовать пробелы и минусы,
   * поскольку такая форма облегчает восприятие (то есть проверку глазами)
   * введенного номера. После того как вычищаю их, должен остаться лишь
   * чистый номер телефона +7xxxxxxxxxx, и вот его-то регулярка
   * и проверяет
   */
  if (!string || !re.test(string.replace(/\s/gi, "").replace(/-/gi, ""))) {
    errors.push("Number should contain 11 digits. Example: +7 999 123-45-67");
  }

  return errors;
};

/**
 * Валидация адеса электронной почты
 */
let validateEmail = function(string) {
  let errors = [];

  /**
   * Это просто одна из регулярок, которые можно найти в интернете.
   * Я читал о проблеме валидации адресов электронной почты, и не стал бы
   * на этой регулярке заострять внимание, потому что иначе откроется
   * ящик Пандоры.
   */
  let re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i;

  if (!string || !re.test(string)) {
    errors.push("Check this address. Example: example@example.com");
  }

  return errors;
};

/**
 * Валидация селекта, в данном случае никакого практического смысла,
 * просто в порядке бреда
 */
let validateSkills = function(val) {
  let errors = [];

  switch (val) {
    case "senior":
      errors.push("Don't even try");
      break;

    case "idk":
      errors.push("You should really know that kind of thing");
      break;

    default:
      break;
  }

  return errors;
}

export default {
  name: validateName,
  email: validateEmail,
  phone: validatePhoneNumber,
  skills: validateSkills
};
