import './Modal.css';

function Modal(props) {
  return (
    <div className='modal'>
      <div className='modal__container'>
        <div className='btn modal__close-btn' onClick={props.onClose} />
        {props.children}
      </div>
      <div className='overlay' onClick={props.onClose} />
    </div>
  );
}

export default Modal;
