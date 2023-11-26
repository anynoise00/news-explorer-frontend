const emailOptions = {
  required: {
    value: true,
    message: 'Campo obrigatório',
  },
  expression: {
    //eslint-disable-next-line
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    message: 'E-mail inválido',
  },
};

const passwordOptions = {
  required: {
    value: true,
    message: 'Campo obrigatório',
  },
  minLength: {
    value: 8,
    message: 'Senha muito curta',
  },
};

const usernameOptions = {
  required: {
    value: true,
    message: 'Campo obrigatório',
  },
  minLength: {
    value: 2,
    message: 'Nome de usuário muito curto',
  },
  maxLength: {
    value: 16,
    message: 'Nome de usuário muito grande',
  },
};

const defaultErrorMessage = 'Erro desconhecido';

function validateInput(input, options = {}) {
  if (options.required && options.required.value && input === '') {
    return options.required.message ?? defaultErrorMessage;
  } else if (
    options.minLength &&
    options.minLength.value &&
    input.length < options.minLength.value
  ) {
    return options.minLength.message ?? defaultErrorMessage;
  } else if (
    options.maxLength &&
    options.maxLength.value &&
    input.length > options.maxLength.value
  ) {
    return options.maxLength.message ?? defaultErrorMessage;
  } else if (
    options.expression &&
    options.expression.value &&
    !input.match(options.expression.value)
  ) {
    return options.expression.message ?? defaultErrorMessage;
  }

  return '';
}

function handleInputChange(e, setter, options = {}) {
  const value = e.target.value;
  const error = validateInput(value, options);

  setter({
    value,
    error,
    valid: error === '',
  });
}

module.exports = {
  emailOptions,
  usernameOptions,
  passwordOptions,
  handleInputChange,
};
