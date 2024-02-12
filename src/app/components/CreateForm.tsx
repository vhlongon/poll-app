'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { createEvent } from '../actions/createEvent';
import { DatePicker } from './DatePicker';
import { ErrorMessage } from './ErrorMessage';
import { Input } from './Input';

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
    <div className="card min-w-96 max-w-lg bg-base-100 shadow-xl shadow-stone-950">
      <div className="card-body items-center">
        <h1 className="text-3xl font-bold mb-2 card-title">Create an event</h1>
        <form action={formAction} className="flex flex-col gap-4 w-96">
          <Input
            required
            type="text"
            id="name"
            name="name"
            placeholder="My event"
            className="input input-bordered w-full"
            label="Choose a name for event"
          />
          {state?.name && <ErrorMessage>{state.name}</ErrorMessage>}
          <Input
            type="text"
            id="author"
            name="author"
            placeholder="Anonymous"
            className="input input-bordered w-full"
            label="Optional: Your name"
          />
          <DatePicker
            multiple
            placeholder="Select dates"
            name="dates"
            format="MM/DD/YY"
            minDate={new Date()}
            label="Choose dates for event"
          />
          {state?.dates && <ErrorMessage>{state.dates}</ErrorMessage>}
          <SubmitButton />
          {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}
        </form>
      </div>
    </div>
  );
};
