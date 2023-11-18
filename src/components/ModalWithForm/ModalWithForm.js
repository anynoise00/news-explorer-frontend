import Modal from '../Modal/Modal';

import './ModalWithForm.css';

function ModalWithForm(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <Modal {...props}>
      <form className='form' name={props.name} onSubmit={handleSubmit}>
        <h2 className='form__header'>{props.title}</h2>

        <div className='form__body'>{props.body}</div>

        <div className='form__footer'>
          {props.error && <p className='form__submit-error'>{props.error}</p>}
          <input
            type='submit'
            className='btn btn_type_submit form__submit-btn'
            value={props.submitBtnText}
            disabled={!props.btnActive}
          />
          {props.footer}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
