let validateName = function(string) {
  let errors = [];

  /*
    Здесь я выкидываю из строки все латинские буквы и пробелы,
    и смотрю осталось ли что-то в строке. Если да, то строка не валидна.
    Возможно, не самый очевидный способ, но точно проще, чем любая другая
    регулярка.
   */
  if (string.replace(/\s/g, '').replace(/[a-z]/gi, '')) {
    errors.push(`Only latin letters are allowed. Example: John Doe`);
  }

  return errors;
};

let validatePhoneNumber = function(string) {
  let errors = [];
  let re = /^\+7\d{10}$/gi;

  /*
    Я разрешаю пользователям использовать пробелы и минусы,
    поскольку такая форма облегчает восприятие (то есть проверку глазами)
    введенного номера. После того как вычищаю их, должен остаться лишь
    чистый номер телефона +7xxxxxxxxxx, и вот его-то регулярка
    и проверяет. Можно было бы разрешить использовать скобочки, я лично
    считаю это старомодным. Скобочки означают необязательную есть номера,
    которую не нужно вводить, когда звонишь по локальной телефонной сети.
    Сейчас в Москве это вообще невозможно, во всей остальной части России
    в мобильных сетях тоже. То есть как бы скобочки не надо использовать.
   */
  if (!re.test(string.replace(/\s/gi, '').replace(/-/gi, ''))) {
    errors.push(`Only digits, spaces, '-' and '+' signs are allowed. Number should contain 11 digits. Example: +7 999 123-45-67`);
  }

  return errors;
};

let validateEmail = function(string) {
  let errors = [];

  /*
    Это просто одна из регулярок, которые можно найти в интернете.
    Я читал о проблеме валидации адресов электронной почты, и не стал бы
    на этой регулярке заострять внимание, потому что иначе откроется
    ящик Пандоры.
   */
  let re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i;

  if (!re.test(string)) {
    errors.push(`Check this email. Example: test@mail.ru`);
  }

  return errors;
};

/*
  Если честно, не знаю, что делать с этим валидатором.
  Поскольку это селект, то "неправильных" значений быть не может,
  но можно поставить условия, что значение 'senior' допускается
  только для пользователей с доменом почты mail.ru. Тогда это будет
  кастомной функцией, и ее следовало бы поместить в модуле компонента
  формы.
 */
let validateSkills = function(val) {
  let errors = [];

  if (val === 'senior') {
    errors.push(`Don't even try`);
  }

  return errors;
}

export default {
  name: validateName,
  email: validateEmail,
  phone: validatePhoneNumber,
  skills: validateSkills
};
