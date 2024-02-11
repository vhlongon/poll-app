'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { FormError, createEvent } from '../actions/createEvent';
import { ErrorMessage } from './ErrorMessage';
import { DatePicker } from './DatePicker';

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

export const CreateForm = () => {
  const [state, formAction] = useFormState(createEvent, undefined);

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
      {state?.name && <ErrorMessage>{state.name}</ErrorMessage>}
      <label className="form-control w-full">
        <DatePicker />
      </label>
      {state?.dates && <ErrorMessage>{state.dates}</ErrorMessage>}
      <SubmitButton />
      {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}
    </form>
  );
};
