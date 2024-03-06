'use client';
import { useId } from 'react';
import { useFormState } from 'react-dom';
import { checkPassword } from '../actions/checkPassword';
import { ErrorMessage } from './ErrorMessage';
import { SubmitButton } from './SubmitButton';

export const ProtectForm = () => {
  const id = useId();
  const [state, formAction] = useFormState(checkPassword, undefined);

  return (
    <div className="card min-w-72 max-w-lg bg-base-100 shadow-xl shadow-stone-950">
      <div className="card-body items-center">
        <h1 className="text-3xl font-bold mb-4 card-title dnd-heading text-center">
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
          <SubmitButton
            loadingText="Verifying..."
            text="Speak the passphrase"
          />
          {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}
        </form>
      </div>
    </div>
  );
};
