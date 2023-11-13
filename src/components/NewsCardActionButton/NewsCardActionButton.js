import { useState } from 'react';
import './NewsCardActionButton.css';

function NewsCardActionButton(props) {
  const [isOpen, setOpen] = useState(false);

  function handleConfirm(e) {
    e.preventDefault();
    props.onActionConfirm();
    setOpen(false);
  }

  function handleMouseEnter() {
    setOpen(true);
  }

  function handleMouseLeave() {
    setOpen(false);
  }

  return (
    <div
      className='news-card__btn-container'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <input
        type='button'
        className={`btn news-card__action-btn news-card__action-btn_type_${props.type}`}
      />
      {isOpen && (
        <input
          type='button'
          className='btn news-card__confirm-btn'
          onClick={handleConfirm}
          value={props.message}
        />
      )}
    </div>
  );
}

export default NewsCardActionButton;
