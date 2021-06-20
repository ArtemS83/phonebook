import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import style from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onCloseModal }) => {
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };
  useEffect(() => {
    // console.log('Modal componentDidMount');
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      // console.log('Modal componentWillUnmount');
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return createPortal(
    <div className={style.Overlay} onClick={handleBackdropClick}>
      <div className={style.Modal} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
