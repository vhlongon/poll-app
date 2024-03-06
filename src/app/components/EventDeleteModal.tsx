'use client';
import { useRef } from 'react';
import { DeleteForm } from './DeleteForm';
import { Modal, openModal } from './Modal';

type EventDeleteProps = {
  id: string;
};

export const EventDeleteModal = ({ id }: EventDeleteProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="btn btn-error btn-sm"
        onClick={() => openModal(ref.current)}
      >
        Delete
      </button>
      <Modal ref={ref}>
        <DeleteForm id={id} />
      </Modal>
    </>
  );
};
