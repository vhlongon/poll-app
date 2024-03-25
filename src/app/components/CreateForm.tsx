'use client';
import Link from 'next/link';
import { useId } from 'react';
import { useFormState } from 'react-dom';
import { createEvent } from '../actions/createEvent';
import { DatePicker } from './DatePicker';
import { ErrorMessage } from './ErrorMessage';
import { Input } from './Input';
import { SubmitButton } from './SubmitButton';

export const CreateForm = () => {
  const id = useId();
  const [state, formAction] = useFormState(createEvent, undefined);

  return (
    <div className="card min-w-72 max-w-lg bg-base-100 shadow-xl shadow-stone-950">
      <div className="card-body items-center">
        <h1 className="text-3xl font-bold mb-2 card-title dnd-heading">
          Forge Gathering
        </h1>
        <form action={formAction} className="flex flex-col gap-4 w-72" id={id}>
          <Input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Mine Own Festivity"
            className="input input-bordered w-full"
            label="Selecteth a name for the gathering"
          />
          {state?.name && <ErrorMessage>{state.name}</ErrorMessage>}
          <Input
            type="number"
            id="maxParticipants"
            name="maxParticipants"
            placeholder="0"
            className="input input-bordered w-full"
            label="Utmost Count of Attendees"
          />

          <Input
            type="text"
            id="author"
            name="author"
            placeholder="Nameless Wanderer"
            className="input input-bordered w-full"
            label="At Will: Thy Name"
          />
          <DatePicker
            multiple
            placeholder="Choose Days"
            name="dates"
            format="MM/DD/YY"
            minDate={new Date()}
            label="Select Days for the Festivity"
          />
          {state?.dates && <ErrorMessage>{state.dates}</ErrorMessage>}
          <SubmitButton loadingText="Crafting..." text="Craft" />
          {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}
          <div className="divider">or</div>
          <div className="flex justify-center items-center w-full">
            <Link href="/events" className="link link-accent">
              Behold Assemblies Forged
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
