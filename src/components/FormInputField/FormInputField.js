import './FormInputField.css';

function FormInputField(props) {
  return (
    <div className='form__input-field'>
      {props.label && (
        <label className='form__label' htmlFor={props.name}>
          {props.label}
        </label>
      )}
      <input className='form__text-field' {...props} id={props.name} />
      <p className='form__error-msg'>{props.error}</p>
    </div>
  );
}

export default FormInputField;
