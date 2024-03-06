'use client';
import React, { useRef } from 'react';
import { DeleteForm } from './DeleteForm';

const isDialog = (ref: unknown): ref is HTMLDialogElement => {
  return ref instanceof HTMLDialogElement;
};

type EventDeleteProps = {
  id: string;
};

const openModal = (ref: unknown) => {
  if (!isDialog(ref)) {
    return;
  }

  ref.showModal();
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
      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <DeleteForm id={id} />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
