import { ReactNode, forwardRef } from 'react';

const isDialog = (ref: unknown): ref is HTMLDialogElement => {
  return ref instanceof HTMLDialogElement;
};

export const openModal = (ref: unknown) => {
  if (!isDialog(ref)) {
    return;
  }

  ref.showModal();
};

export const Modal = forwardRef<HTMLDialogElement, { children: ReactNode }>(
  ({ children }, ref) => {
    return (
      <dialog ref={ref} className="modal">
        <div className="modal-box">
          {children}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    );
  }
);

Modal.displayName = 'Modal';
