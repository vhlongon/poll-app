'use client';
import { useId } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { checkPassword } from '../actions/checkPassword';
import { ErrorMessage } from './ErrorMessage';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      className="btn btn-primary w-full"
      type="submit"
    >
      {pending ? (
        <>
          <span className="loading loading-spinner" />
          Loading...
        </>
      ) : (
        <>Submit</>
      )}
    </button>
  );
};

export const ProtectForm = () => {
  const id = useId();
  const [state, formAction] = useFormState(checkPassword, undefined);

  return (
    <div className="card min-w-72 max-w-lg bg-base-100 shadow-xl shadow-stone-950">
      <div className="card-body items-center">
        <h1 className="text-3xl font-bold mb-2 card-title dnd-heading text-center">
          Thou shalt utter the secret phrase.
        </h1>
        <form action={formAction} className="flex flex-col gap-4" id={id}>
          <div className="form-control w-full max-w-xs">
            <input
              type="password"
              name="password"
              id="password"
              className="input input-bordered w-full max-w-xs"
              placeholder="Enter password"
              required
            />
          </div>
          <SubmitButton />
          {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}
        </form>
      </div>
    </div>
  );
};
