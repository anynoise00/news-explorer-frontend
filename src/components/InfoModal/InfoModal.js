import Modal from '../Modal/Modal';

import './InfoModal.css';

function InfoModal(props) {
  return (
    <Modal {...props}>
      <div className='info-modal'>
        <h2 className='info-modal__header'>{props.header}</h2>
        {props.info && <div className='info-modal__text'>{props.info}</div>}
      </div>
    </Modal>
  );
}

export default InfoModal;
