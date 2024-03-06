'use client';
import { useId } from 'react';
import { useFormState } from 'react-dom';
import { deleteEvent } from '../actions/deleteEvent';
import { ErrorMessage } from './ErrorMessage';
import { SubmitButton } from './SubmitButton';

type DelteFormProps = {
  id: string;
};
export const DeleteForm = ({ id }: DelteFormProps) => {
  const formId = useId();
  const [state, formAction] = useFormState(deleteEvent, undefined);

  return (
    <div className="flex items-center justify-center w-full">
      <form
        action={formAction}
        className="max-w-xs flex flex-col gap-4"
        id={formId}
      >
        <div className="form-control w-full max-w-xs">
          <input type="hidden" name="id" value={id} id="id" />
        </div>
        <SubmitButton
          loadingText="Banishing..."
          text="Banish gathering"
          color="error"
        />
        {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}
      </form>
    </div>
  );
};
