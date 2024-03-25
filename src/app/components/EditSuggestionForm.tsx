'use client';
import { TimeSuggestion } from '@/db/schema';
import { Fragment, useEffect, useId, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { editSuggestion } from '../actions/editSuggestion';
import { getSuggestionsUsers } from '../utils/utils';
import { ErrorMessage } from './ErrorMessage';
import { Input } from './Input';
import { Modal, closeModal, openModal } from './Modal';
import { SubmitButton } from './SubmitButton';

type EditSuggestionFormProps = TimeSuggestion & {
  totalUniqueVoters: number;
  maxParticipants: number;
};

export const EditSuggestionForm = ({
  id,
  eventId,
  users,
  maxParticipants,
  totalUniqueVoters,
}: EditSuggestionFormProps) => {
  const formId = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const [state, formAction] = useFormState(editSuggestion, undefined);
  const [currentUsers, setCurrentUsers] = useState<string[]>([]);
  const [newUser, setNewUser] = useState('');
  const isSuccessful = state?.success;

  const updateUsers = (user: string) => {
    if (currentUsers.includes(user)) {
      setCurrentUsers(currentUsers.filter(u => u !== user));
    } else {
      setCurrentUsers([...currentUsers, user]);
    }
  };

  useEffect(() => {
    setCurrentUsers(getSuggestionsUsers(users));
  }, [users]);

  useEffect(() => {
    if (isSuccessful) {
      setNewUser('');
      closeModal(ref.current);
    }
  }, [isSuccessful, users]);

  const hasMaxParticipants = totalUniqueVoters >= maxParticipants;

  return (
    <>
      <button
        className="btn btn-accent btn-xs"
        onClick={() => openModal(ref.current)}
      >
        Revise
      </button>
      <Modal ref={ref}>
        <p className="font-bold mb-4 uppercase">Adjoin or Banish Companions</p>
        <div className="flex items-center justify-center w-full">
          <form
            action={formAction}
            className="max-w-xs flex flex-col gap-2"
            id={formId}
          >
            <div className="form-control w-full max-w-xs">
              <input type="hidden" name="id" value={id} id="id" />
              <input
                type="hidden"
                name="eventId"
                value={eventId}
                id="eventId"
              />
            </div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Expunge Brethren</span>
              </div>
              <fieldset name="users">
                {currentUsers.length ? (
                  currentUsers.map(user => (
                    <Fragment key={user}>
                      <div className="flex gap-2 w-full items-center justify-between">
                        <input
                          className="input input-ghost input-xs focus:outline-none focus:border-none w-full"
                          name="users"
                          defaultValue={user}
                          readOnly
                        />
                        <button
                          className="btn btn-xs btn-error"
                          type="button"
                          onClick={() => updateUsers(user)}
                        >
                          Banish
                        </button>
                      </div>
                      <div className="divider my-1" />
                    </Fragment>
                  ))
                ) : (
                  <span className="text-gray-500">None Companions</span>
                )}
              </fieldset>
            </label>
            <div className="flex gap-4 w-full justify-between items-end">
              <Input
                type="text"
                id="user"
                name="user"
                disabled={hasMaxParticipants}
                placeholder="Thy Name"
                label="Append Companion"
                className="input input-bordered w-full"
                value={newUser}
                onChange={e => setNewUser(e.target.value)}
              />
              <button
                className="btn btn-accent"
                name="users"
                type="button"
                disabled={
                  !newUser ||
                  currentUsers.includes(newUser) ||
                  hasMaxParticipants
                }
                onClick={() => {
                  updateUsers(newUser);
                }}
              >
                {hasMaxParticipants ? 'At Capacity' : 'Adjoin'}
              </button>
            </div>
            <div className="mt-4">
              <SubmitButton loadingText="Revising..." text="Revise gathering" />
            </div>
            {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}
          </form>
        </div>
      </Modal>
    </>
  );
};
