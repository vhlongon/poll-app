'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { FormError, createEvent } from '../actions/createEvent';
import { ErrorMessage } from './ErrorMessage';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      className="btn btn-success w-full"
      type="submit"
    >
      {pending ? (
        <>
          <span className="loading loading-spinner" />
          Creating...
        </>
      ) : (
        <>Create</>
      )}
    </button>
  );
};

const initialState: FormError = {
  error: '',
};

export const CreateForm = () => {
  const [state, formAction] = useFormState(createEvent, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4 w-96">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Choose a name for the event</span>
        </div>
        <input
          required
          type="text"
          id="name"
          name="name"
          placeholder="Event name"
          className="input input-bordered w-full"
        />
      </label>
      {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}
      <SubmitButton />
    </form>
  );
};
