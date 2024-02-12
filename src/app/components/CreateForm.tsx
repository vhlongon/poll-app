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
      <Input
        required
        type="text"
        id="name"
        name="name"
        placeholder="Event name"
        className="input input-bordered w-full"
      />
      {state?.name && <ErrorMessage>{state.name}</ErrorMessage>}
      <label className="form-control w-full">
        <DatePicker
          multiple
          placeholder="Select dates"
          name="dates"
          format="MM/DD/YY"
          minDate={new Date()}
        />
      </label>
      {state?.dates && <ErrorMessage>{state.dates}</ErrorMessage>}
      <SubmitButton />
      {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}
    </form>
  );
};
