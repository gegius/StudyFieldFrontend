import { JSX } from 'react';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type TConfirmModel = {
  onConfirm: () => void,
  onClose: () => void,
  children: JSX.Element,
  title: string,
  isShow: boolean
}

export const ConfirmModal = ({ onConfirm, children, onClose, title, isShow }: TConfirmModel) => {
  return (
    <Modal
      aria-labelledby={'contained-modal-title-vcenter'}
      centered
      onHide={onClose}
      show={isShow}
    >
      <Modal.Header closeButton>
        <Modal.Title id={'contained-modal-title-vcenter'}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={'secondary'}
          onClick={onClose}
        >
          {'Отмена'}
        </Button>
        <Button onClick={onConfirm}>{'Подтвердить'}</Button>
      </Modal.Footer>
    </Modal>
  );
};
